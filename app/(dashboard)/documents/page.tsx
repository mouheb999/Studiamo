import ComingSoon from '@/components/shared/ComingSoon'

export default function DocumentsPage() {
  return (
    <ComingSoon
      icon="📋"
      title="Document Hub"
      teaser={[
        "Tutoriels étape par étape pour chaque document",
        "Upload + audit IA de vos documents",
        "Checklist personnalisée avec statut en temps réel"
      ]}
    />
  )
}
