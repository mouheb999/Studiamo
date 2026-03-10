import { createClient } from '@/lib/supabase/server'
import { createClaudeClient, SYSTEM_PROMPT } from '@/lib/claude'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Get user from Supabase session
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Check free tier limits
    if (profile.tier === 'free') {
      const resetTime = new Date(profile.questions_reset_at)
      const now = new Date()

      // Reset counter if 24 hours have passed
      if (now > resetTime) {
        await supabase
          .from('profiles')
          .update({
            questions_today: 1,
            questions_reset_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
          })
          .eq('id', user.id)
      } else {
        // Check if limit reached
        if (profile.questions_today >= 5) {
          return NextResponse.json(
            { error: 'Daily question limit reached' },
            { status: 429 }
          )
        }

        // Increment counter
        await supabase
          .from('profiles')
          .update({
            questions_today: profile.questions_today + 1,
          })
          .eq('id', user.id)
      }
    }

    // Get student profile for context
    const { data: studentProfile } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Create Claude client
    const claude = createClaudeClient()

    // Build system prompt with user context
    let systemPrompt = SYSTEM_PROMPT
    if (studentProfile) {
      systemPrompt += `\n\nProfil étudiant: ${JSON.stringify({
        degree_type: studentProfile.degree_type,
        field_of_study: studentProfile.field_of_study,
        target_field: studentProfile.target_field,
        italian_level: studentProfile.italian_level,
        intake_year: studentProfile.intake_year,
      })}`
    }

    // Stream response from Claude
    const stream = await claude.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    })

    // Create a readable stream for the response
    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(chunk.delta.text))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
