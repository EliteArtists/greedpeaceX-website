import React, { useState } from 'react';

// --- DATA FROM AI AGENT ---
const MANUAL_SCORES = [
  {
    id: 'bp-manual',
    greed_targets: { name: 'BP' },
    greed_score: 18,
    community_harm: 27,
    profit_from_necessity: 22,
    obscurity: 14,
    exploit_ratio: 11,
    pay_inequality: 8,
    responsiveness: 4,
    rationale: {
      environmental_harm: "BP remains one of the largest corporate contributors to the climate crisis. In February 2025 the company publicly shifted strategy to increase annual oil and gas spending to about $10bn while cutting more than $5bn from its low-carbon investment plans, doubling down on high-emissions hydrocarbons rather than leading a transition.",
      profit_from_necessity: "BP sells essential energy products and generated massive profits ($14bn in 2023, $8.9bn in 2024) even as households faced high fuel costs. It has maintained dividends and share buybacks while prioritizing free cash flow over low-carbon spending, framed by critics as excessive fossil-fuel profiteering from a basic necessity.",
      greenwashing: "Academic and NGO work has repeatedly concluded that big oil climate narratives amount to greenwashing. BP withdrew ads after complaints they misled the public by foregrounding small renewables activities while >96% of spend remained on oil and gas. In 2025 it abandoned its green strategy, slashing renewables spending.",
      worker_exploitation: "This month BP told 5,400 staff at its UK forecourts that it will remove paid rest breaks and most bank-holiday premiums to offset the cost of the real living wage. Unions say this wipes out the headline pay rise. Separately, executive bonuses were trimmed after contractor fatalities, indicating ongoing workplace safety issues.",
      pay_inequality: "BP’s CEO earned ~£8m in 2023 and £5.4m in 2024. Campaigners describe these packages as obscene given the cost-of-living crisis. Set against the removal of paid breaks for forecourt workers, this pattern indicates extreme internal pay disparity.",
      resistance_to_accountability: "BP faces mounting climate litigation, including a 2024 suit by the city of Chicago for deceiving the public about fossil fuel dangers. A US Senate report found big oil companies privately acknowledged efforts to downplay the climate crisis while lobbying against laws they publicly claimed to support."
    }
  },
  {
    id: 'thames-water-manual',
    greed_targets: { name: 'Thames Water' },
    greed_score: 17,
    community_harm: 27,
    profit_from_necessity: 23,
    obscurity: 13,
    exploit_ratio: 3,
    pay_inequality: 8,
    responsiveness: 4,
    rationale: {
      environmental_harm: "Thames Water has been fined a record £123m by Ofwat, including £104m specifically for sewage and wastewater failures that caused 'unacceptable' environmental harm. Sewage discharges rose by about 50% in 2024. Communities have filed complaints over failures to upgrade polluting plants, with raw sewage hours at key sites up 240% since 2019.",
      profit_from_necessity: "Water is an essential monopoly service. Thames Water swung to a £414m half-year profit after raising customer bills by 31%, driving a 40% jump in revenues despite warning of potential collapse under debt. It seeks to recoup £1.18bn from customers for overdue upgrades regulators say were already paid for.",
      greenwashing: "Thames Water issued £3.1bn in green bonds while environmental performance declined, described by campaigners as 'corporate greenwash on steroids'. It failed to publish standard impact reports on bond proceeds for two years and is pushing for 15 years of leniency on environmental standards while emphasising investment and spill reductions.",
      worker_exploitation: "Coverage focuses on environmental breaches and financial engineering rather than systematic workforce abuse. There is little evidence of major strikes or safety scandals directly affecting staff. Harms fall primarily on customers and communities through pollution and bills rather than classic labour-rights violations.",
      pay_inequality: "Senior management attracted criticism for multimillion-pound rewards while the company is distressed. Bosses were in line for £18.5m in retention payments from an emergency loan. The CEO's package can reach millions. £2.46m was paid to managers despite government threats, prompting MPs to call it 'disgusting'.",
      resistance_to_accountability: "Thames Water has repeatedly sought to avoid consequences: lobbying for leniency on fines and relaxed standards, and arguing that paying the Ofwat penalty could threaten survival. It spent over £7.5m on legal fees contesting enforcement and refused to claw back bonuses until forced by public pressure."
    }
  },
  {
    id: 'nestle-manual',
    greed_targets: { name: 'Nestlé' },
    greed_score: 17,
    community_harm: 23,
    profit_from_necessity: 21,
    obscurity: 12,
    exploit_ratio: 11,
    pay_inequality: 7,
    responsiveness: 4,
    rationale: {
      environmental_harm: "Nestlé is repeatedly identified as a major contributor to global plastic pollution: a 2024 study reported by the Guardian found that just 60 firms are responsible for half of the world’s plastic waste, with Nestlé among the top five worst offenders. In 2025 the company also faced criticism over palm-oil-linked deforestation in West Papua.",
      profit_from_necessity: "Nestlé sells essential food and infant nutrition products. A November 2025 Guardian investigation found added sugar in over 90% of Cerelac samples in African countries, averaging about 6g per serving, despite WHO guidance. African civil-society groups accused Nestlé of 'putting the health of African babies at risk for profit'.",
      greenwashing: "Despite prominent sustainability marketing, Greenpeace has repeatedly challenged Nestlé's credibility, describing its assertion that 77% of commodities were deforestation-free as a 'blatant and embarrassing attempt to deceive customers'. The contrast between marketing and continued allegations of ecocide indicates significant misalignment.",
      worker_exploitation: "In October 2025, Nestlé announced plans to cut 16,000 jobs – almost 6% of its global workforce – to boost savings and growth. These mass redundancies come on top of long-running labour-rights concerns linking cocoa supply chains to child labour and exploitation in West Africa.",
      pay_inequality: "Nestlé is a large, highly profitable multinational whose executive board receives substantial aggregate compensation while frontline staff face job cuts. Cost-saving measures such as the 16,000 planned redundancies were rewarded by the stock market, prioritizing shareholder interests over job security.",
      resistance_to_accountability: "Nestlé has been at the centre of long-running consumer boycotts over infant formula marketing. The 2025 baby-cereals investigation shows a familiar pattern: the company rejects findings as 'misleading' and insists it complies with regulations, engaging defensively rather than embracing full transparency."
    }
  },
  {
    id: 'barclays-manual',
    greed_targets: { name: 'Barclays' },
    greed_score: 16,
    community_harm: 23,
    profit_from_necessity: 19,
    obscurity: 12,
    exploit_ratio: 8,
    pay_inequality: 9,
    responsiveness: 4,
    rationale: {
      environmental_harm: "Barclays is repeatedly identified as a major financial driver of high-carbon projects. A 2025 study found UK banks put £75bn into companies behind 'carbon bomb' megaprojects, with Barclays financing 62 of them. It remains Europe’s biggest fossil-fuel financier, increasing such financing by 55% in 2024.",
      profit_from_necessity: "Barclays provides essential banking services and generated £8.1bn in pre-tax profits in 2024. It has been part of a wider pattern of lenders raising mortgage rates and fees even after base-rate cuts, and faces group actions over 'unfair' mortgages, indicating it protects returns even when customers are under pressure.",
      greenwashing: "Barclays brands itself as committed to net-zero by 2050. However, it remains a key backer of climate-wrecking projects. In 2025 it quit the UN-backed Net-Zero Banking Alliance even as officials insist banks are engaged on climate, making its climate-leadership messaging look inconsistent with its financing profile.",
      worker_exploitation: "Barclays' issues centre on cost-cutting and job security. In February 2024 it unveiled a £2bn cost-cutting drive raising fears of job losses, prioritizing efficiency and investor returns over staff continuity. Ongoing restructuring creates uncertainty for thousands of employees.",
      pay_inequality: "Barclays displays very high internal pay gaps: its CEO's package more than doubled to £10.5m for 2024. After the banker bonus cap was scrapped, top pay soared further, with one banker receiving up to £14.8m, while cost-cutting continues elsewhere in the group.",
      resistance_to_accountability: "In July 2025 the FCA fined Barclays £42m for 'poor handling' of financial-crime risks. The bank faces group legal actions over mortgages and continuing controversy over former CEO Jes Staley’s relationship with Jeffrey Epstein. Its exit from the Net-Zero Banking Alliance reflects a tendency to step away from collective accountability."
    }
  },
  {
    id: 'amazon-manual',
    greed_targets: { name: 'Amazon' },
    greed_score: 16,
    community_harm: 22,
    profit_from_necessity: 18,
    obscurity: 13,
    exploit_ratio: 13,
    pay_inequality: 8,
    responsiveness: 4,
    rationale: {
      environmental_harm: "Amazon's environmental footprint is dominated by expanding data-centre and logistics operations. It plans to spend ~$100bn in 2025 largely on AI infrastructure, driving massive new power demand. Employees have warned the 'warp-speed' AI rollout is fueling rising emissions, already exceeding many countries.",
      profit_from_necessity: "While retail is discretionary, Amazon is a de facto channel for basics. Investigations found US schools overpaid by 17% on supplies due to opaque pricing. It agreed a record $2.5bn FTC settlement over 'dark patterns' trapping customers in Prime, even as quarterly net income rose 40% to $21.2bn.",
      greenwashing: "Amazon markets climate leadership but lobbies against tighter Greenhouse Gas Protocol rules. Its sustainability director questioned funding for groups not aligned with its stance. The Bezos Earth Fund cut ties with a climate standard amid offset scrutiny, suggesting green branding outpaces genuine reductions.",
      worker_exploitation: "Amazon plans to cut 14,000 corporate jobs despite booming revenue. It faces accusations of union-busting after firing drivers in New York and disciplining staff in Coventry. Workers in Saudi Arabia describe unresolved abuses, and UK warehouses report high injury rates, reinforcing concerns about its intense model.",
      pay_inequality: "The CEO's pay package was 6,474 times the median worker pay. With quarterly net income over $21bn and massive AI investment, investors and executives enjoy outsized rewards while workers face layoffs and low pay. The internal pay gap remains extreme.",
      resistance_to_accountability: "Amazon's approach is highly defensive, fighting antitrust cases and declining to admit wrongdoing in the Prime settlement. It lobbies against carbon-accounting standards and has appealed NLRB rulings on labour disputes, resisting transparent accountability."
    }
  },
  {
    id: 'british-gas-manual',
    greed_targets: { name: 'British Gas' },
    greed_score: 16,
    community_harm: 21,
    profit_from_necessity: 23,
    obscurity: 10,
    exploit_ratio: 6,
    pay_inequality: 9,
    responsiveness: 4,
    rationale: {
      environmental_harm: "British Gas’s parent Centrica has doubled down on fossil gas infrastructure: in August 2025 it agreed a £1.5bn deal to buy the Isle of Grain LNG terminal, described as a big bet on continued fossil fuel reliance. It also signed a £20bn gas-import contract with Equinor running to 2035, locking in high gas use.",
      profit_from_necessity: "Operating in the essential home energy market, Centrica has generated large profits and investor rewards during the price crisis. It executed a £1.5bn share buyback while campaigners noted over £7bn in profit since the crisis began. Bad debts rose 82% in 2024 while dividends were hiked, prioritizing shareholders over struggling households.",
      greenwashing: "Centrica brands itself as central to a lower-carbon energy system but its flagship projects are tied to fossil fuels. The Isle of Grain LNG purchase and £10bn SMR programme are core strategic moves, while it warns of a 'challenging' environment for green energy, creating a gap between climate messaging and its asset trajectory.",
      worker_exploitation: "While reporting on direct wage theft is limited, a major scandal occurred in 2023 when agents were found breaking into vulnerable customers' homes to fit prepayment meters. Recent reports of chaotic support and errors billing refugees suggest systemic pressure on frontline and contractor roles to follow rigid processes rather than resolve harm.",
      pay_inequality: "Centrica’s CEO received a package doubling to around £8m following record profits. In May 2025 nearly 40% of shareholders voted against pay plans, noting this occurred while bill-payers faced record debts. Combined with buybacks, this indicates gains are channeled to executives and investors while customers face tight conditions.",
      resistance_to_accountability: "British Gas often requires regulatory pressure to address problems, such as the 2023 forced prepayment meter ban. Recent cases of vulnerable customers left without heating were only fully resolved after media intervention, while leadership pushed ahead with contentious pay packages despite shareholder revolt."
    }
  },
  {
    id: 'boohoo-manual',
    greed_targets: { name: 'BooHoo' },
    greed_score: 14,
    community_harm: 21,
    profit_from_necessity: 9,
    obscurity: 13,
    exploit_ratio: 13,
    pay_inequality: 9,
    responsiveness: 4,
    rationale: {
      environmental_harm: "Boohoo is a major fast-fashion retailer whose model depends on high volumes of low-cost garments. Reporting shows roughly half of clothes sold are made entirely from virgin plastics like polyester. Reductions in per-garment impact are cancelled out by rising production volumes, indicating systemic environmental harm.",
      profit_from_necessity: "Boohoo sells clothing, an essential category, but focuses on discretionary fast fashion. Recent coverage highlights its struggle to attract shoppers and heavy discounting amid competition. Cost-cutting and job cuts come against falling sales, suggesting only moderate current profit extraction from necessity.",
      greenwashing: "Boohoo was central to the UK’s first big regulatory crackdown on fashion greenwashing. In March 2024, it agreed to detailed undertakings with the CMA – including clearer labelling and avoiding vague 'green' imagery – after concerns its sustainability claims could mislead consumers.",
      worker_exploitation: "Investigations have documented serious failings in Boohoo’s Leicester supply chain, with evidence of workers paid well below minimum wage. Campaigners estimated workers could be owed up to £125m. In 2024, investors launched a £100m claim alleging Boohoo delayed disclosing these abuses.",
      pay_inequality: "Coverage highlights an aggressive executive incentive scheme: the CEO could receive almost £150m in shares for a turnaround. A wider £222m management pay plan was denounced by a major shareholder as a 'corporate disgrace', standing in stark contrast to low-paid supply-chain workers.",
      resistance_to_accountability: "Boohoo faces a landmark investor lawsuit alleging it misled the market about supply chain exploitation; it has hired heavyweight counsel to contest claims. On environmental marketing, it only tightened practices after a CMA investigation forced formal undertakings."
    }
  },
  {
    id: 'coca-cola-manual',
    greed_targets: { name: 'Coca-Cola' },
    greed_score: 14,
    community_harm: 24,
    profit_from_necessity: 12,
    obscurity: 13,
    exploit_ratio: 7,
    pay_inequality: 6,
    responsiveness: 4,
    rationale: {
      environmental_harm: "Analysis estimates Coca-Cola products could be responsible for ~602m kg of plastic entering waterways annually by 2030. A 2024 study found just 60 firms account for half of global plastic pollution, with Coca-Cola among the worst. It warned tariffs might push it back to more plastic bottles, clashing with sustainability goals.",
      profit_from_necessity: "Coca-Cola generates strong profits by raising prices faster than volumes. Q3 2025 results show operating income up 59%. While soft drinks are discretionary, bottled water and beverages are embedded in daily life, and the system extracts healthy returns from consumers worldwide.",
      greenwashing: "Accused of a 'masterclass in greenwashing' for quietly removing its pledge to make 25% of packaging reusable by 2030 just before a major summit. Its sponsorship of COP27 was condemned given its status as a top polluter. High-profile branding contrasts with findings that its packaging strategy undermines waste reduction.",
      worker_exploitation: "Direct coverage is limited but present: 150 workers at a Northmead factory voted to strike over low pay compared to rivals. While evidence of systemic global wage theft is less prominent in these sources, clear disputes and pressure on frontline staff exist without reaching the level of entrenched exploitation seen elsewhere.",
      pay_inequality: "Coca-Cola and partners generate solid earnings and dividends while frontline workers strike over low pay. Shareholders approved significant executive remuneration even in low-wage markets, implying a classic pattern of generous top-level rewards and tight wage pressure lower down.",
      resistance_to_accountability: "Engaged in a high-stakes tax dispute with the IRS, potentially owing $16bn; it is vigorously appealing. On environment, it stepped back from reusable packaging pledges. Activist boycotts target operations in occupied territories. It engages primarily through legal challenge and lobbying rather than full alignment with justice demands."
    }
  },
  {
    id: 'primark-manual',
    greed_targets: { name: 'Primark' },
    greed_score: 13,
    community_harm: 22,
    profit_from_necessity: 9,
    obscurity: 11,
    exploit_ratio: 11,
    pay_inequality: 7,
    responsiveness: 3,
    rationale: {
      environmental_harm: "Primark is a major fast-fashion retailer relying on high volumes of low-cost garments. Investigations found discarded clothing from UK brands including Primark illegally dumped in protected wetlands in Ghana. While claiming progress on sustainable fibres, these improvements only partially mitigate the underlying high-impact model.",
      profit_from_necessity: "Primark sells clothing, including essentials, but is positioned as ultra-cheap fast fashion. It passed the £1bn profit milestone in 2024 with strong margins, indicating strong returns from low-priced clothing, but less evidence of extreme price-gouging on core subsistence goods compared to energy or grocery giants.",
      greenwashing: "Primark promotes its Sustainability and Ethics Progress Report, claiming 74% of clothes use recycled fibres. However, independent coverage notes supply-chain emissions cuts lag targets. Greenpeace links discarded Primark clothes to illegal dumping, suggesting a significant gap between marketing and real-world footprint.",
      worker_exploitation: "Ethical Consumer finds inadequate safeguards for workers' rights despite code of conduct. Allegations persist regarding factories in Myanmar, including denied leave and low wages. Primark only moved towards a 'responsible exit' after assessments found forced labour made due diligence impossible.",
      pay_inequality: "Primark's parent ABF pays its CEO roughly £3.7m, with the Weston family taking £32m in dividends. The business model depends on low-paid garment workers in countries like Bangladesh and budget-conscious retail staff. This combination supports a relatively high pay-inequality score.",
      resistance_to_accountability: "On internal conduct, the CEO resigned after an external investigation into behaviour, showing some accountability. However, on supply-chain abuses, Primark remained in high-risk Myanmar for years and only exited after significant external pressure. Transparency is improving but remains reactive to scandals."
    }
  },
  {
    id: 'tesco-manual',
    greed_targets: { name: 'Tesco' },
    greed_score: 13,
    community_harm: 13,
    profit_from_necessity: 19,
    obscurity: 10,
    exploit_ratio: 10,
    pay_inequality: 8,
    responsiveness: 3,
    rationale: {
      environmental_harm: "Tesco has made notable progress on its operational footprint, reporting about a 65% reduction in emissions since 2015. However, its overall environmental impact remains large because most emissions sit in its supply chain, and NGOs continue to raise concerns about forest-risk commodities and deforestation links.",
      profit_from_necessity: "Groceries are essential goods, and Tesco has generated multi-billion-pound profits and increased market share during the cost-of-living crisis. Union leaders describe this as 'profiteering pure and simple'. Tesco has raised profit forecasts and executed share buybacks while trumpeting price cuts.",
      greenwashing: "Tesco strongly markets its sustainability strategy. Yet NGOs have accused it of greenwashing, particularly over continued sales of forest-risk products despite deforestation pledges, with calls for the CMA to scrutinise whether its green claims mislead customers.",
      worker_exploitation: "Tesco has faced repeated disputes over pay and conditions. In 2024 it lost a significant UK legal case over attempts to 'fire and rehire' staff on lower pay. Ethical ratings flag ongoing concerns about workers' rights, despite relatively strong supply-chain policies.",
      pay_inequality: "Tesco’s CEO Ken Murphy was paid around £9.9m, more than doubling his previous package and equating to roughly 373–431 times the typical Tesco worker’s pay. These rewards coincided with strong profits and ongoing cost-cutting.",
      resistance_to_accountability: "Tesco has a history of scrutiny from regulators. While it publishes extensive sustainability reporting, persistent NGO accusations of greenwashing around deforestation suggest it has at times been slow to fully align its public claims with its underlying sourcing practices."
    }
  },
  {
    id: 'p-o-ferries-manual',
    greed_targets: { name: 'P&O Ferries' },
    greed_score: 12,
    community_harm: 9,
    profit_from_necessity: 18,
    obscurity: 10,
    exploit_ratio: 15,
    pay_inequality: 9,
    responsiveness: 5,
    rationale: {
      environmental_harm: "P&O operates high-emissions ferries but has invested in hybrid vessels and biofuel trials, claiming CO2 reductions. While structurally high-carbon, there is no recent evidence of catastrophic spills or major fines, signalling some operational efficiency progress rather than outright disregard.",
      profit_from_necessity: "As a critical transport operator, P&O sacked nearly 800 UK seafarers in 2022 to replace them with cheaper agency staff. While P&O itself posts losses, its owner DP World reported record profits shortly after, prompting accusations of 'corporate gangsters' profiting while cutting labour costs to the bone.",
      greenwashing: "P&O promotes its hybrid ferries as 'leading decarbonisation'. However, its core model relies on fossil-fuel ships and its biggest scandals are labour-related. Without independent regulatory sign-off on its 'leading' narrative, environmental branding appears overstated relative to overall impact.",
      worker_exploitation: "A textbook case of extreme exploitation: summarily dismissing ~800 seafarers without consultation to hire agency staff on wages as low as £5.15/hr. The CEO admitted breaking the law. Governments had to legislate to close loopholes, confirming previous pay levels were deeply exploitative.",
      pay_inequality: "Despite losses and scandal, the CEO's pay jumped 55% to ~£683k after the mass sackings, while crews were replaced with low-paid agency workers. Owners enjoyed record profits, highlighting a pattern where executives and owners benefit financially from cost-cutting at the expense of workers.",
      resistance_to_accountability: "P&O admitted breaking consultation laws but faced no criminal sanctions until laws were tightened. Recently, KPMG resigned as auditor over delays, replaced by a tiny firm, raising transparency questions. P&O declined to answer media questions, suggesting a preference for minimal disclosure and using legal grey areas."
    }
  },
  {
    id: 'boeing-manual',
    greed_targets: { name: 'Boeing' },
    greed_score: 12,
    community_harm: 19,
    profit_from_necessity: 7,
    obscurity: 9,
    exploit_ratio: 12,
    pay_inequality: 8,
    responsiveness: 5,
    rationale: {
      environmental_harm: "Boeing is half of the global large-jet duopoly. Planes sold in just two years will emit >1bn tonnes of CO2 over their lifetimes. Boeing is betting on 'sustainable aviation fuel' rather than radical tech, while targeting higher production rates, locking in high-carbon aviation for decades.",
      profit_from_necessity: "Boeing sells to airlines and governments, one step removed from consumer essentials. It reported massive losses ($11.8bn in 2024) and negative margins due to charges, indicating an emphasis on balance-sheet repair rather than extracting windfall profits from the public during a cost-of-living crisis.",
      greenwashing: "Boeing has 'bet the farm' on sustainable aviation fuel (SAF), despite warnings that SAF narratives overstate what is achievable. Its climate messaging gives a greener impression than warranted by the scale of lifetime fleet emissions, looking optimistic relative to actual product impacts.",
      worker_exploitation: "A deeply troubled safety culture: whistleblowers allege harassment and intimidation. An engineer testified there is 'no safety culture'. 30,000 workers mounted a lengthy strike in 2024 after Boeing withdrew pay offers, signaling intense conflict over conditions and union-busting allegations.",
      pay_inequality: "The outgoing CEO received $32.8m for 2023 (up 45%) and nearly $100m since 2020, despite safety crises. A former CEO walked away with $60m after 737 Max crashes. This pattern of massive rewards in bad times sits uneasily beside strikes and safety failures.",
      resistance_to_accountability: "Boeing agreed a $1.1bn deal to avoid prosecution over 737 Max misleading statements, described as 'morally repugnant'. Regulators rebuke its record-keeping (missing door-plug records), and workers claim managers silence safety concerns. It consistently resists full, transparent accountability."
    }
  },
  {
    id: 'rolls-royce-manual',
    greed_targets: { name: 'Rolls-Royce' },
    greed_score: 12,
    community_harm: 21,
    profit_from_necessity: 9,
    obscurity: 10,
    exploit_ratio: 8,
    pay_inequality: 7,
    responsiveness: 3,
    rationale: {
      environmental_harm: "Rolls-Royce’s core businesses – jet engines and nuclear reactors – lock in high-carbon aviation and controversial nuclear technologies. It is central to the UK’s nuclear weapons system and its SMR plans are criticised as costly and risky compared with renewables.",
      profit_from_necessity: "Rolls-Royce provides critical infrastructure (aviation, defence, nuclear) and has turned these into high earnings, with profits guided above £3bn. It has resumed dividends and buybacks, returning large sums to investors while taxpayers and passengers bear the costs of high-carbon travel and defence.",
      greenwashing: "Rolls-Royce markets itself as a climate-solution company, highlighting sustainable fuels. Yet analysts argue these fixes cannot fully solve aviation emissions, and Greenpeace rates its financial climate disclosures only 'partial'. Its SMR promotion is contested by economists warning of costs and delays.",
      worker_exploitation: "A mixed record: UK workers secured multi-year pay deals and share offers. However, 800 US unionised workers voted to authorise a strike in 2025 over tiered wages and healthcare. Industry commentary notes increasing use of outsourcing to push down terms.",
      pay_inequality: "The CEO's package remains a multi-million-pound sum with high incentive potential. This sits alongside a dramatic share-price rise and buybacks, meaning executives and shareholders capture large gains while average employees receive relatively modest one-off grants.",
      resistance_to_accountability: "Historically paid a massive settlement over corruption. More recently, Greenpeace found climate disclosure only partially adequate. US subsidiaries donate to politicians, highlighting influence risks. However, it now publishes human-rights policies, suggesting a cautious rather than overtly obstructionist stance."
    }
  },
  {
    id: 'hyundai-motor-manual',
    greed_targets: { name: 'Hyundai Motor' },
    greed_score: 11,
    community_harm: 20,
    profit_from_necessity: 9,
    obscurity: 10,
    exploit_ratio: 7,
    pay_inequality: 3,
    responsiveness: 3,
    rationale: {
      environmental_harm: "As a major global carmaker, Hyundai's core business carries a structurally high climate footprint. Real-world testing found the Kona Hybrid using 33% more fuel than official figures. Broader analysis suggests carmakers systematically under-report emissions, implying actual environmental impacts are higher than headline efficiency numbers.",
      profit_from_necessity: "Cars are important but less fundamental than food/energy. Hyundai's financials show pressure: net profit dropped 22% in mid-2025 due to tariffs. It is committing billions to EV investment and has held prices despite tariffs, suggesting a focus on long-term positioning rather than aggressively extracting excess profit from necessity.",
      greenwashing: "Hyundai markets hybrids as lower-emission options, but independent tests show significant over-consumption of fuel compared to lab figures. Doubling its hybrid range while trumpeting EVs creates tension between its green narrative and continued reliance on combustion drivetrains with understated real-world impacts.",
      worker_exploitation: "South Korean workers launched a strike in 2025 before securing a deal, indicating ongoing disputes but an established negotiation framework. In the US, Hyundai was drawn into fallout from an immigration raid at a partner plant; while most detainees were subcontractor employees, it highlights risks in the wider ecosystem.",
      pay_inequality: "There is little recent detailed reporting on extreme CEO-to-worker pay ratios or controversies compared to Western peers. While significant gaps are likely in a large corporation, the absence of fresh evidence of outsized awards or shareholder rebellions keeps this score at the low end.",
      resistance_to_accountability: "Hyundai declined to comment when tests showed its hybrid used 33% more fuel than claimed, hinting at defensiveness. Regarding the US immigration raid, leadership emphasized that workers were employed by subcontractors, reflecting a tendency to rely on legal boundaries rather than broad accountability for labour standards."
    }
  },
  {
    id: 'asda-manual',
    greed_targets: { name: 'Asda' },
    greed_score: 10,
    community_harm: 8,
    profit_from_necessity: 17,
    obscurity: 10,
    exploit_ratio: 11,
    pay_inequality: 7,
    responsiveness: 4,
    rationale: {
      environmental_harm: "Limited recent coverage of direct pollution incidents, but supply chain investigations link major retailers like Asda to environmental impacts abroad (e.g., salmon farming). As a large grocer with extensive operations, it has a substantial footprint, though not on the scale of catastrophic spills.",
      profit_from_necessity: "Asda was singled out for sharply higher fuel profit margins in 2024, becoming the UK's most expensive supermarket for fuel. Private-equity owners have loaded the business with debt, creating pressure to squeeze returns. However, Asda is investing in price cuts and has been named the cheapest major supermarket, indicating mixed impact.",
      greenwashing: "In March 2024, the CMA concluded an investigation into Asda's environmental claims, requiring changes to marketing of 'green' ranges to avoid misleading shoppers. This is a clear regulator-level finding of greenwashing risk. Asda continues to promote sustainable offers while operating a conventional high-volume model.",
      worker_exploitation: "Asda is at the centre of a massive equal pay dispute with over 60,000 largely female staff claiming their roles are of equal value to warehouse jobs. A 2025 tribunal ruling supported claimants, paving the way for up to £1.2bn in compensation. Asda continues to contest the claims rather than settling.",
      pay_inequality: "The equal pay case highlights a stark gap between shop-floor staff and better-paid warehouse workers. Controlled by billionaire owners and private equity, Asda's complex financing structures and debt burden contrast with the large underpayments for tens of thousands of staff, supporting a relatively high inequality score.",
      resistance_to_accountability: "Asda has fought the equal pay case for over a decade, taking it to the supreme court. On environmental marketing, it only tightened claims after CMA intervention. It denied strategies to bump fuel prices despite evidence of tripling margins. Complex ownership structures reduce transparency about debt."
    }
  }
];

// Component for Individual Score Cells with Rationale Tooltip
const ScoreWithTooltip = ({ score, rationale }) => (
  <div className="group relative flex items-center justify-center cursor-help w-full h-full">
    <span className={`font-bold ${score > 15 ? 'text-red-400' : 'text-gray-300'}`}>{score}</span>
    
    {/* Rationale Tooltip */}
    <div className="absolute top-full mt-2 w-72 p-4 bg-gray-900 text-white text-xs font-normal rounded shadow-2xl border border-gray-700 hidden group-hover:block z-50 text-left leading-relaxed">
      {rationale}
      {/* Arrow */}
      <div className="absolute -top-2 left-1/2 -ml-2 border-8 border-transparent border-b-gray-700"></div>
    </div>
  </div>
);

// Component for Table Headers (General Definitions)
const HeaderWithTooltip = ({ title, description }) => (
  <div className="group relative flex items-center justify-center cursor-help">
    <span className="border-b border-dotted border-gray-400 hover:border-white transition-colors">{title}</span>
    <span className="ml-1 text-xs text-gray-400 opacity-70">ⓘ</span>
    
    {/* Definition Tooltip */}
    <div className="absolute top-full mt-2 w-64 p-4 bg-white text-black text-xs font-normal rounded shadow-xl hidden group-hover:block z-50 text-left leading-relaxed border border-gray-200">
      {description}
      <div className="absolute -top-2 left-1/2 -ml-2 border-8 border-transparent border-b-white"></div>
    </div>
  </div>
);

function GreedIndexPage() {
  // Sort the manual scores by greed_score descending before rendering
  const scores = MANUAL_SCORES.sort((a, b) => b.greed_score - a.greed_score);

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-8">
      {/* PAGE HEADER & DESCRIPTION */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">GREED INDEX</h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          The Greed Index uses GPX’s six-factor algorithm to reveal how major companies profit through harm, greenwashing, and exploitation—updated monthly using public evidence. Hover or tap any score to see how the value was calculated.
        </p>
      </div>

      {/* DATA TABLE */}
      <div className="overflow-x-auto overflow-y-auto border border-gray-700 rounded-lg shadow-2xl" style={{ maxHeight: '600px', minHeight: '300px' }}>
        <table className="w-full text-left border-collapse relative">
          <thead>
            <tr className="bg-green-700 text-white sticky top-0 z-20 shadow-md">
              <th className="p-4 text-left font-bold border-b border-green-800 w-1/6">Company</th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Env. Harm (30%)" 
                  description="Measures the scale of ecological damage caused by the company’s core operations." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Profit (25%)" 
                  description="Evaluates how much of the company’s revenue depends on harmful or exploitative activities." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Greenwash (15%)" 
                  description="Assesses misleading environmental claims, deceptive marketing, or sustainability PR." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Worker Exp. (15%)" 
                  description="Scores the company’s impact on workers across the supply chain." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Pay Gap (10%)" 
                  description="Measures inequality inside the company by comparing CEO compensation to median worker pay." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Accountability (5%)" 
                  description="Evaluates the company’s willingness to be transparent and admit wrongdoing." 
                />
              </th>
              
              <th className="p-4 text-center font-bold border-b border-green-800">
                <HeaderWithTooltip 
                  title="Total Score" 
                  description="The combined weighted score of all six categories." 
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.id} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors duration-150`}>
                <td className="p-4 border-b border-gray-700 font-medium">
                  {/* Note: The company links here might need updating if you don't have individual pages for all companies yet */}
                  <a href={`/company/${score.greed_targets.name}`} className="text-white hover:text-green-400 hover:underline text-lg">
                    {score.greed_targets.name}
                  </a>
                </td>
                
                {/* Individual Score Cells with Specific Rationale Tooltips */}
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.community_harm} rationale={score.rationale.environmental_harm} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.profit_from_necessity} rationale={score.rationale.profit_from_necessity} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.obscurity} rationale={score.rationale.greenwashing} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.exploit_ratio} rationale={score.rationale.worker_exploitation} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.pay_inequality} rationale={score.rationale.pay_inequality} />
                </td>
                <td className="p-4 text-center border-b border-gray-700">
                  <ScoreWithTooltip score={score.responsiveness} rationale={score.rationale.resistance_to_accountability} />
                </td>
                
                {/* Total Score */}
                <td className="p-4 text-center border-b border-gray-700 font-bold text-xl">
                  {/* Note: Linking to /report/{id} assumes reports exist for all. You might want to remove the link if they don't. */}
                  <a href={`/report/${score.id}`} className="text-yellow-400 hover:text-yellow-300 hover:underline">
                    {score.greed_score}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GreedIndexPage;
