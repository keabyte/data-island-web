import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CoinGeckoService, CoinMarket } from 'src/app/shared/services/coin-gecko.service';

@Component({
	selector: 'dil-coin-details',
	templateUrl: './coin-details.component.html',
	styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnChanges {
	@Input() coin: CoinMarket;

	@Output() closeClicked = new EventEmitter();

	constructor(private coinService: CoinGeckoService) {}

	ngOnChanges(changes: SimpleChanges): void {}
}