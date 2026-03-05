import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const agences = await getCollection('agences');
  const blog = await getCollection('blog');

  const siteUrl = 'https://avis-agences-digitales.fr';
  const sortedAgences = agences.map(a => a.data).sort((a, b) => b.noteGlobale - a.noteGlobale);
  const sortedBlog = [...blog].sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const lines: string[] = [
    '# Avis Agences Digitales — Contenu complet',
    '',
    '> Plateforme de référence pour les avis clients vérifiés sur les agences web et SEO en France. Comparez les notes, retours d\'expérience et trouvez l\'agence digitale idéale pour votre projet.',
    '',
    `Site : ${siteUrl}`,
    'Langue : Français',
    `Nombre d'agences référencées : ${sortedAgences.length}`,
    `Nombre d'articles : ${sortedBlog.length}`,
    '',
    '---',
    '',
  ];

  // Détail de chaque agence
  for (const agence of sortedAgences) {
    lines.push(`## ${agence.nom}`);
    lines.push('');
    lines.push(`- URL : ${siteUrl}/avis/${agence.slug}`);
    lines.push(`- Site web : ${agence.siteWeb}`);
    lines.push(`- Ville : ${agence.ville}`);
    lines.push(`- Note globale : ${agence.noteGlobale}/5`);
    lines.push(`- Nombre d'avis : ${agence.avis.length}`);
    lines.push(`- Spécialités : ${agence.specialites.join(', ')}`);
    lines.push('');
    lines.push('### Description');
    lines.push('');
    lines.push(agence.description);
    lines.push('');

    if (agence.avis.length > 0) {
      lines.push(`### Avis clients (${agence.avis.length})`);
      lines.push('');
      for (const avis of agence.avis) {
        lines.push(`**${avis.auteur}** — ${avis.note}/5 — ${avis.date}`);
        lines.push(avis.texte);
        lines.push('');
      }
    }

    if (agence.faq.length > 0) {
      lines.push('### FAQ');
      lines.push('');
      for (const item of agence.faq) {
        lines.push(`**Q : ${item.question}**`);
        lines.push(`R : ${item.reponse}`);
        lines.push('');
      }
    }

    lines.push('---');
    lines.push('');
  }

  // Articles du blog
  lines.push('## Articles du blog');
  lines.push('');

  for (const post of sortedBlog) {
    const slug = post.id.replace(/\.md$/, '');
    lines.push(`### ${post.data.title}`);
    lines.push('');
    lines.push(`- URL : ${siteUrl}/blog/${slug}`);
    lines.push(`- Date : ${post.data.date}`);
    lines.push(`- Auteur : ${post.data.author}`);
    lines.push(`- Description : ${post.data.description}`);
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
