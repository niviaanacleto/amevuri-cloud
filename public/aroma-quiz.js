(() => {
  'use strict';
  const profiles = {
    refugio: { fragrance: 'sakura', title: 'Refúgio', copy: 'Você procura serenidade e delicadeza. Flores suaves e musk acompanham os momentos de descanso.' },
    leveza: { fragrance: 'sakura', title: 'Leveza', copy: 'Você prefere ambientes luminosos e uma presença floral delicada, com frutas suaves e musk.' },
    presenca: { fragrance: 'rosa', title: 'Presença', copy: 'Você gosta de uma assinatura marcante. Rosa, açafrão e madeiras criam uma atmosfera floral, especiada e sofisticada.' },
    aconchego: { fragrance: 'cumaru', title: 'Aconchego', copy: 'Você busca calor e acolhimento. Cumaru e sândalo trazem uma presença amadeirada, cremosa e envolvente.' }
  };
  const fragrances = {
    sakura: { product: 'Árvore de Sakura & Musk', notes: 'Flor de cerejeira · frutas suaves · musk', link: '/produto-sakura' },
    rosa: { product: 'Rosa Búlgara & Açafrão', notes: 'Rosa · neroli · açafrão · oud · patchouli', link: '/produto-rosa' },
    cumaru: { product: 'Cumaru & Sândalo', notes: 'Cumaru · sândalo · madeiras cremosas', link: '/produto-cumaru' }
  };
  function resolve(answers) {
    const valid = answers.filter(answer => Object.hasOwn(profiles, answer));
    if (valid.length !== 4) throw new Error('Responda às quatro perguntas.');
    const scores = { sakura: 0, rosa: 0, cumaru: 0 };
    valid.forEach(answer => scores[profiles[answer].fragrance]++);
    const highest = Math.max(...Object.values(scores));
    // Em empate, vale a primeira preferência expressa entre os aromas empatados.
    const winner = valid.map(answer => profiles[answer].fragrance).find(id => scores[id] === highest);
    const profile = profiles[valid.find(answer => profiles[answer].fragrance === winner)];
    return { ...profile, ...fragrances[winner] };
  }
  window.AMEVURI_QUIZ = Object.freeze({ resolve });
})();
