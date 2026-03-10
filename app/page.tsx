export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-primary mb-4">
          StudiAmo
        </h1>
        <p className="text-xl text-ink/70">
          Votre passerelle vers les universités italiennes
        </p>
        <div className="mt-8 space-x-4">
          <a 
            href="/login" 
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-smooth"
          >
            Se connecter
          </a>
          <a 
            href="/register" 
            className="inline-block px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-smooth"
          >
            Commencer gratuitement
          </a>
        </div>
      </div>
    </main>
  )
}
