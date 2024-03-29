import { Component, OnInit } from '@angular/core';
import { Portfolio, PortfolioService } from 'src/app/shared/services/portfolio.service';

@Component({
	selector: 'dil-portfolio-tracker',
	templateUrl: './portfolio-tracker.component.html',
	styleUrls: ['./portfolio-tracker.component.scss']
})
export class PortfolioTrackerComponent implements OnInit {
	selectedPortfolio: Portfolio | null = null;

	portfolios: Portfolio[] = [];

	constructor(private portfolioService: PortfolioService) {}

	ngOnInit(): void {
		this.portfolioService.getPortfolios().subscribe(portfolios => {
			this.portfolios = portfolios.sort((a, b) => (a.order > b.order ? 1 : -1));
			this.selectPortfolio(this.portfolios[0]);
		});
	}

	selectPortfolio(portfolio: Portfolio) {
		this.selectedPortfolio = portfolio;
	}

	deletePortfolio(portfolio: Portfolio) {
		this.portfolioService.deletePortfolio(portfolio.id).subscribe(resp => {
			this.portfolios = this.portfolios.filter(p => p.id !== portfolio.id);
			this.selectPortfolio(this.portfolios.reverse().find(p => p.order < portfolio.order) || this.portfolios[0]);
			this.portfolios.reverse();
		});
	}

	createPortfolio() {
		const maxOrderAssetRow = this.portfolios.sort((a, b) => (a.order > b.order ? -1 : 1))[0];

		const portfolioRequest: Portfolio = {
			id: null,
			name: 'New portfolio',
			assets: [],
			createdDate: new Date(),
			totalValue: 0,
			order: (maxOrderAssetRow?.order || 0) + 1
		};
		this.portfolioService.createPortfolio(portfolioRequest).subscribe(resp => {
			this.portfolios.push(resp);
			this.portfolios = this.portfolios.sort((a, b) => (a.order > b.order ? 1 : -1));
			this.selectPortfolio(resp);
		});
	}

	updatePortfolio(portfolio: Portfolio) {
		this.portfolioService.updatePortfolio(portfolio).subscribe(resp => {
			const updatedIndex = this.portfolios.findIndex(p => p.id === resp.id);
			this.portfolios[updatedIndex] = resp;
		});
	}
}
