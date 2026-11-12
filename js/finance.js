/* Modelo acadêmico reproduzido de finance/README.md e docs/08-plano-financeiro.md.
   Números sintéticos e hipóteses não validadas — não representam receitas reais. */
(() => {
  'use strict';
  const settings = {
    pessimista: { label: 'Pessimista', months: [3,6,9,12], churn: 0.05, cac: 900, fixed: 1300, variable: 65, onboarding: 350, tax: 0.08, warning: 'O caixa se torna negativo no mês 3. Não há capital suficiente para operar nesse cenário.' },
    base: { label: 'Base', months: [2,3,4,6,7,9,10,12], churn: 0.02, cac: 600, fixed: 1000, variable: 40, onboarding: 250, tax: 0.06, warning: 'Quase empate: R$ 106 de fluxo anual positivo, ainda sem pró-labore fixo integral.' },
    otimista: { label: 'Otimista', months: [1,2,3,4,5,6,7,8,9,10,11,12], churn: 0.01, cac: 450, fixed: 1000, variable: 30, onboarding: 200, tax: 0.06, warning: 'O caixa cresce na simulação, mas continua insuficiente para remunerar toda a equipe.' }
  };
  const teamCost = 2500; // hipótese adicional, NÃO folha completa de uma equipe.
  const money = value => new Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL', maximumFractionDigits:0}).format(value);
  const compute = (key, includeTeam=false) => {
    const s = settings[key];
    if (!s) throw new Error(`Cenário inexistente: ${key}`);
    let active = 0, cash = 3000, revenue = 0, expenses = 0;
    const series = [];
    for (let m=1;m<=12;m++) {
      const newClients = Number(s.months.includes(m));
      const canceled = active * s.churn;
      active = active - canceled + newClients;
      const receipts = newClients * 990 + active * 299;
      const costs = active * s.variable + newClients * s.onboarding + receipts * s.tax + newClients * s.cac + s.fixed + (includeTeam?teamCost:0);
      cash += receipts-costs;
      revenue += receipts; expenses += costs;
      series.push({month:m, active, newClients, canceled, receipts, costs, cash, net:receipts-costs});
    }
    const contribution = 299*(1-s.tax)-s.variable;
    const breakeven = Math.ceil((s.fixed+(includeTeam?teamCost:0))/contribution);
    const burn = Math.max(0,-series[0].net);
    return {...s,key,includeTeam,teamCost,contribution,breakeven,runway:burn>0?3000/burn:null,series,revenue,expenses,result:revenue-expenses,lastCash:cash,newClients:s.months.length,active,minCash:Math.min(...series.map(x=>x.cash))};
  };

  // PLANEJAMENTO da empresa combinada, NÃO vendas/preços já realizados.
  // O modelo compute() permanece intacto para auditar o produto Modernize IA.
  const companyPlans = Object.freeze({
    pessimista: { workshops: [3,6,9,12], projects: [4,10] },
    base: { workshops: [1,2,3,4,5,6,7,8,9,10,11,12], projects: [1,2,4,6,8,10,12] },
    otimista: { workshops: [1,2,3,4,5,6,7,8,9,10,11,12,2,4,6,8,10,12], projects: [1,2,3,4,5,6,7,8,9,10,11,12] }
  });
  const companyRates = Object.freeze({ workshop: 1500, project: 4000, serviceCost: 0.30 });
  const computeCompany = (key, includeTeam = true) => {
    const product = compute(key, includeTeam);
    const plan = companyPlans[key];
    if (!plan) throw new Error('Cenário inexistente: ' + key);
    let extraRevenue = 0, extraCosts = 0, extraCash = 0;
    let cumulativeRevenue = 0;
    const series = product.series.map(month => {
      const workshops = plan.workshops.filter(n => n === month.month).length;
      const projects = plan.projects.filter(n => n === month.month).length;
      const servicesRevenue = workshops * companyRates.workshop + projects * companyRates.project;
      const servicesCosts = servicesRevenue * companyRates.serviceCost;
      extraRevenue += servicesRevenue;
      extraCosts += servicesCosts;
      extraCash += servicesRevenue - servicesCosts;
      cumulativeRevenue += month.receipts + servicesRevenue;
      return {...month, workshops, projects, servicesRevenue, servicesCosts,
        receipts: month.receipts + servicesRevenue,
        costs: month.costs + servicesCosts,
        cash: month.cash + extraCash,
        net: month.net + servicesRevenue - servicesCosts,
        cumulativeRevenue};
    });
    const revenue = product.revenue + extraRevenue;
    const expenses = product.expenses + extraCosts;
    const result = revenue - expenses;
    return {...product, series, revenue, expenses, result, margin: revenue ? result / revenue : 0,
      lastCash: series.at(-1).cash,
      minCash: Math.min(3000, ...series.map(m => m.cash)),
      services: {workshops: plan.workshops.length, projects: plan.projects.length, revenue: extraRevenue, costs: extraCosts},
      rates: companyRates};
  };
  window.ModernizeFinance = Object.freeze({compute,computeCompany,companyPlans,companyRates,settings,money});
})();
