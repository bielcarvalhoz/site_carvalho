const CONTENT = {
  pt: {
    nav: { stack: 'Stack', projects: 'Projetos', journey: 'Jornada', contact: 'Contato' },
    face: { live: 'disponível', role: 'Full-Stack Developer' },
    hint: 'ROLE PARA EXPLORAR',
    chapters: [
      { num: '1', label: 'CODE', kicker: 'CÓDIGO', title: 'Escrevo o que ainda não existe.', body: 'Construindo a web — do front-end TypeScript ao back-end em Node, Python e Elixir.' },
      { num: '2', label: 'SHIP', kicker: 'TERMINAL', title: 'Há 4 anos colocando código em produção.', body: 'Cresci de estagiário a júnior no Bradesco, entregando aplicações reais que rodam todo dia.' },
      { num: '3', label: 'WHO', kicker: 'QUEM SOU', title: 'Gabriel Carvalho — 22 anos, de São Paulo.', body: 'Formado em Ciência da Computação pela USTJ, com base técnica desde a Fundação Bradesco.' },
      { num: '4', label: 'STACK', kicker: 'STACK', title: 'Uma stack ampla, do front ao banco.', body: 'TypeScript, Angular, Node, Python, Django, Elixir, SQL — e a curiosidade pra ir além.' }
    ],
    release: { kicker: 'AGORA, OS DETALHES', title1: 'Tudo o que você precisa saber sobre o', title2: 'Gabriel.', body: 'Stack, projetos, trajetória e contato — sem rodeios.', cta1: 'Ver projetos →', cta2: 'Entrar em contato' },
    stackS: { kicker: '// STACK', title: 'Tecnologias que eu domino', sub: 'O conjunto de ferramentas que uso no dia a dia, do front ao back e à camada de dados.' },
    projects: { kicker: '// TRABALHOS', title: 'Projetos selecionados', sub: 'Uma amostra do que construo. Em breve casos reais — por enquanto, espaços reservados.', demo: 'Demo', code: 'Código' },
    journey: { kicker: '// TRAJETÓRIA', title: 'Minha jornada até aqui' },
    contact: { kicker: '// CONTATO', title: 'Vamos construir algo juntos?', text: 'Aberto a novas oportunidades, colaborações e conversas sobre tecnologia. É só chamar.', built: 'Feito com HTML, CSS & JS' }
  },
  en: {
    nav: { stack: 'Stack', projects: 'Projects', journey: 'Journey', contact: 'Contact' },
    face: { live: 'available', role: 'Full-Stack Developer' },
    hint: 'SCROLL TO EXPLORE',
    chapters: [
      { num: '1', label: 'CODE', kicker: 'CODE', title: "I write what doesn't exist yet.", body: 'Building the web — from a TypeScript front end to Node, Python and Elixir on the back end.' },
      { num: '2', label: 'SHIP', kicker: 'TERMINAL', title: '4 years shipping code to production.', body: 'I grew from intern to junior at Bradesco, delivering real applications that run every day.' },
      { num: '3', label: 'WHO', kicker: 'WHO I AM', title: 'Gabriel Carvalho — 22, from São Paulo.', body: 'CS degree from USTJ, with a technical foundation built since high school at Fundação Bradesco.' },
      { num: '4', label: 'STACK', kicker: 'STACK', title: 'A broad stack, from front end to database.', body: 'TypeScript, Angular, Node, Python, Django, Elixir, SQL — and the curiosity to go further.' }
    ],
    release: { kicker: 'NOW, THE DETAILS', title1: 'Everything you need to know about', title2: 'Gabriel.', body: 'Stack, projects, journey and contact — straight to the point.', cta1: 'View projects →', cta2: 'Get in touch' },
    stackS: { kicker: '// STACK', title: 'Technologies I work with', sub: 'The toolkit I use every day, from the front end to the back end and the data layer.' },
    projects: { kicker: '// WORK', title: 'Selected projects', sub: 'A sample of what I build. Real case studies coming soon — placeholders for now.', demo: 'Demo', code: 'Code' },
    journey: { kicker: '// PATH', title: 'My journey so far' },
    contact: { kicker: '// CONTACT', title: "Let's build something together?", text: 'Open to new opportunities, collaborations and conversations about tech. Just reach out.', built: 'Built with HTML, CSS & JS' }
  }
};

const DATA = {
  pt: {
    techs: [
      { name: 'HTML', cat: 'Frontend', glyph: '</>' },
      { name: 'CSS', cat: 'Frontend', glyph: '#' },
      { name: 'JavaScript', cat: 'Frontend', glyph: 'JS' },
      { name: 'TypeScript', cat: 'Frontend', glyph: 'TS' },
      { name: 'Angular', cat: 'Frontend', glyph: 'A' },
      { name: 'Node.js', cat: 'Backend', glyph: 'N' },
      { name: 'Python', cat: 'Backend', glyph: 'PY' },
      { name: 'Django', cat: 'Backend', glyph: 'DJ' },
      { name: 'Elixir', cat: 'Backend', glyph: 'EX' },
      { name: 'SQL', cat: 'Dados', glyph: 'DB' }
    ],
    faceTechs: [
      { name: 'TypeScript', color: '#34e3d4' },
      { name: 'Angular', color: '#8f7bff' },
      { name: 'Node.js', color: '#34e3d4' },
      { name: 'Python', color: '#fbbf77' },
      { name: 'Django', color: '#8f7bff' },
      { name: 'Elixir', color: '#fbbf77' },
      { name: 'SQL', color: '#34e3d4' },
      { name: 'HTML/CSS', color: '#8f7bff' }
    ],
    projects: [
      { n: '01', title: 'Projeto em destaque', desc: 'Substitua por um caso real: o problema, sua solução e o impacto.', tags: ['TypeScript', 'Angular', 'Node'], shot: 'imagem do projeto' },
      { n: '02', title: 'Aplicação web', desc: 'Espaço reservado para um produto que você construiu de ponta a ponta.', tags: ['Python', 'Django', 'SQL'], shot: 'imagem do projeto' },
      { n: '03', title: 'Experimento', desc: 'Um projeto pessoal, side-project ou prova de conceito.', tags: ['JavaScript', 'Node', 'Elixir'], shot: 'imagem do projeto' },
      { n: '04', title: 'Open source', desc: 'Uma contribuição ou biblioteca que você mantém.', tags: ['HTML', 'CSS', 'JS'], shot: 'imagem do projeto' }
    ],
    journey: [
      { when: 'Out 2023 — Hoje', role: 'Desenvolvedor Web Júnior', place: 'Bradesco', desc: 'Efetivado em 14/10/2023, evoluí de estagiário a desenvolvedor júnior — há 4 anos no Bradesco, entregando aplicações web em produção.' },
      { when: 'Set 2022', role: 'Estágio em Desenvolvimento', place: 'Bradesco', desc: 'Comecei como estagiário em setembro de 2022 — primeiros passos no ambiente corporativo, construindo interfaces e integrações reais.' },
      { when: '2021', role: 'Ciência da Computação', place: 'USTJ', desc: 'Formado em 2021, com base em fundamentos de computação, algoritmos e engenharia de software.' },
      { when: 'Base', role: 'Ensino Médio Técnico', place: 'Fundação Bradesco — Osasco', desc: 'Onde a base técnica e a disciplina pela tecnologia começaram.' }
    ]
  },
  en: {
    techs: [
      { name: 'HTML', cat: 'Frontend', glyph: '</>' },
      { name: 'CSS', cat: 'Frontend', glyph: '#' },
      { name: 'JavaScript', cat: 'Frontend', glyph: 'JS' },
      { name: 'TypeScript', cat: 'Frontend', glyph: 'TS' },
      { name: 'Angular', cat: 'Frontend', glyph: 'A' },
      { name: 'Node.js', cat: 'Backend', glyph: 'N' },
      { name: 'Python', cat: 'Backend', glyph: 'PY' },
      { name: 'Django', cat: 'Backend', glyph: 'DJ' },
      { name: 'Elixir', cat: 'Backend', glyph: 'EX' },
      { name: 'SQL', cat: 'Data', glyph: 'DB' }
    ],
    faceTechs: [
      { name: 'TypeScript', color: '#34e3d4' },
      { name: 'Angular', color: '#8f7bff' },
      { name: 'Node.js', color: '#34e3d4' },
      { name: 'Python', color: '#fbbf77' },
      { name: 'Django', color: '#8f7bff' },
      { name: 'Elixir', color: '#fbbf77' },
      { name: 'SQL', color: '#34e3d4' },
      { name: 'HTML/CSS', color: '#8f7bff' }
    ],
    projects: [
      { n: '01', title: 'Featured project', desc: 'Replace with a real case: the problem, your solution and the impact.', tags: ['TypeScript', 'Angular', 'Node'], shot: 'project shot' },
      { n: '02', title: 'Web application', desc: 'Placeholder for a product you built end to end.', tags: ['Python', 'Django', 'SQL'], shot: 'project shot' },
      { n: '03', title: 'Experiment', desc: 'A personal project, side-project or proof of concept.', tags: ['JavaScript', 'Node', 'Elixir'], shot: 'project shot' },
      { n: '04', title: 'Open source', desc: 'A contribution or library you maintain.', tags: ['HTML', 'CSS', 'JS'], shot: 'project shot' }
    ],
    journey: [
      { when: 'Oct 2023 — Today', role: 'Junior Web Developer', place: 'Bradesco', desc: 'Made permanent on Oct 14, 2023, I grew from intern to junior developer — 4 years at Bradesco, shipping web apps to production.' },
      { when: 'Sep 2022', role: 'Development Internship', place: 'Bradesco', desc: 'Started as an intern in September 2022 — first steps in a corporate environment, building real interfaces and integrations.' },
      { when: '2021', role: 'Computer Science', place: 'USTJ', desc: 'Graduated in 2021, with a foundation in computing fundamentals, algorithms and software engineering.' },
      { when: 'Foundation', role: 'Technical High School', place: 'Fundação Bradesco — Osasco', desc: 'Where the technical foundation and discipline for tech began.' }
    ]
  }
};
