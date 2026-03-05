import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const agences = await getCollection('agences');
  const blog = await getCollection('blog');

  const siteUrl = 'https://avis-agences-digitales.fr';
  const sortedAgences = agences.map(a => a.data).sort((a, b) => b.noteGlobale - a.noteGlobale);
  const villes = [...new Set(sortedAgences.map(a => a.ville))].sort();
  const sortedBlog = [...blog].sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const lines: string[] = [
    '# Avis Agences Digitales',
    '',
    '> Plateforme de référence pour les avis clients vérifiés sur les agences web et SEO en France. Comparez les notes, retours d\'expérience et trouvez l\'agence digitale idéale pour votre projet.',
    '',
    '## Pages principales',
    '',
    `- [Accueil](${siteUrl}): Comparatif et classement des meilleures agences web en France`,
    `- [Méthodologie](${siteUrl}/methodologie): Méthodologie de notation transparente et impartiale`,
    `- [À propos](${siteUrl}/a-propos): Mission, valeurs et équipe`,
    `- [Contact](${siteUrl}/contact): Soumettre un avis ou contacter l'équipe`,
    `- [Blog](${siteUrl}/blog): Articles et guides pour choisir votre agence web`,
    '',
    '## Agences par ville',
    '',
  ];

  for (const ville of villes) {
    const villeSlug = ville.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const count = sortedAgences.filter(a => a.ville === ville).length;
    lines.push(`- [Agences web ${ville}](${siteUrl}/agences-web/${villeSlug}): ${count} agence${count > 1 ? 's' : ''} référencée${count > 1 ? 's' : ''}`);
  }

  lines.push('', '## Fiches agences', '');

  for (const agence of sortedAgences) {
    lines.push(`- [${agence.nom}](${siteUrl}/avis/${agence.slug}): Note ${agence.noteGlobale}/5 — ${agence.ville} — ${agence.specialites.join(', ')} — ${agence.avis.length} avis`);
  }

  lines.push('', '## Articles du blog', '');

  for (const post of sortedBlog) {
    const slug = post.id.replace(/\.md$/, '');
    lines.push(`- [${post.data.title}](${siteUrl}/blog/${slug}): ${post.data.description}`);
  }

  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
