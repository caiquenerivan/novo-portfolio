// Animações do site: entrada das seções, menu lateral que acompanha o scroll
// e formas do fundo que reagem ao mouse. Roda a cada navegação (View Transitions).

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function reveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reduced() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  items.forEach((el) => io.observe(el));
}

function scrollSpy() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-spy]')];
  const sections = links
    .map((link) => document.getElementById(link.dataset.spy!))
    .filter((el): el is HTMLElement => el !== null);
  if (sections.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          if (link.dataset.spy === entry.target.id) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        }
      }
    },
    // Considera "atual" a seção que cruza a faixa central da tela.
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => io.observe(section));
}

let parallaxBound = false;
function parallax() {
  if (parallaxBound || reduced() || !window.matchMedia('(pointer: fine)').matches) return;
  parallaxBound = true;
  let frame = 0;
  window.addEventListener('pointermove', (event) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const blobs = document.querySelector<HTMLElement>('.blobs');
      if (!blobs) return;
      blobs.style.setProperty('--mx', String(event.clientX / window.innerWidth - 0.5));
      blobs.style.setProperty('--my', String(event.clientY / window.innerHeight - 0.5));
    });
  });
}

document.addEventListener('astro:after-swap', () => document.documentElement.classList.add('js'));
// Links para outros sites (inclusive os escritos nos posts) abrem em nova guia.
function externalLinks() {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')) {
    if (link.host === location.host) continue;
    link.target = '_blank';
    link.relList.add('noopener', 'noreferrer');
  }
}

// Clicar no e-mail copia o endereço e mostra um aviso por alguns segundos.
// Se o navegador negar o acesso à área de transferência, o mailto: segue normalmente.
document.addEventListener('click', async (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-copy]');
  if (!link || link.dataset.busy) return;
  event.preventDefault();
  try {
    await navigator.clipboard.writeText(link.dataset.copy!);
  } catch {
    location.href = link.href;
    return;
  }
  const original = link.textContent;
  link.dataset.busy = 'true';
  link.textContent = link.dataset.copied!;
  setTimeout(() => {
    link.textContent = original;
    delete link.dataset.busy;
  }, 2000);
});

document.addEventListener('astro:page-load', () => {
  externalLinks();
  reveal();
  scrollSpy();
  parallax();
});
