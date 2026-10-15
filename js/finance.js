/* Modelo acadêmico reproduzido de finance/README.md e docs/08-plano-financeiro.md.
   Números sintéticos e hipóteses não validadas — não representam receitas reais. */
(() => {
  'use strict';
  const settings = {
    pessimista: { label: 'Pessimista', months: [3,6,9,12], churn: 0.05, cac: 900, fixed: 1300, variable: 65, onboarding: 350, tax: 0.08, warning: 'O caixa se torna negativo no mês 3. Não há capital suficiente para operar nesse cenário.' },
    base: { label: 'Base', months: [2,3,4,6,7,9,10,12], churn: 0.02, cac: 600, fixed: 1000, variable: 40, onboarding: 250, tax: 0.06, warning: 'Quase empate: R$ 106 de fluxo anual positivo, ainda sem pró-labore fixo integral.' },
    otimista: { label: 'Otimista', months: [1,2,3,4,5,6,7,8,9,10,11,12], churn: 0.01, cac: 450, fixed: 1000, variable: 30, onboarding: 200, tax: 0.06, warning: 'O caixa cresce na simulação, mas continua insuficiente para remunerar toda a equipe.' }
  };
  const money = value => new Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL', maximumFractionDigits:0}).format(value);
  const compute = key => {
    const s = settings[key];
    if (!s) throw new Error(`Cenário inexistente: ${key}`);
    let active = 0, cash = 3000, revenue = 0, expenses = 0;
    const series = [];
    for (let m=1;m<=12;m++) {
      const newClients = Number(s.months.includes(m));
      const canceled = active * s.churn;
      active = active - canceled + newClients;
      const receipts = newClients * 990 + active * 299;
      const costs = active * s.variable + newClients * s.onboarding + receipts * s.tax + newClients * s.cac + s.fixed;
      cash += receipts-costs;
      revenue += receipts; expenses += costs;
      series.push({month:m, active, newClients, canceled, receipts, costs, cash, net:receipts-costs});
    }
    return {...s, key, series, revenue, expenses, result:revenue-expenses, lastCash:cash, newClients:s.months.length, active, minCash:Math.min(...series.map(x=>x.cash))};
  };
  window.ModernizeFinance = Object.freeze({compute,settings,money});
})();