Balanced.InvoicesInvoiceController = Balanced.ObjectController.extend(
	Ember.Evented,
	Balanced.ResultsTable,
	Balanced.TransactionsTable, {
		needs: ['marketplace'],

		type: 'hold',
		sortField: 'created_at',
		sortOrder: 'desc',
		limit: 20,

		baseClassSelector: '#invoice',

		init: function() {
			var self = this;

			Balanced.Model.Events.on('didCreate', function(object) {
				if (Balanced.Transaction.prototype.isPrototypeOf(object)) {
					self.send('reload');
				}
			});
		},

		results: function() {
			switch (this.get('type')) {
				case 'debit':
					return this.get('debits');
				case 'credit':
					return this.get('credits');
				case 'hold':
					return this.get('holds');
				case 'refund':
					return this.get('refunds');
				case 'card_debit':
					return this.get('card_debits');
				case 'bank_account_debit':
					return this.get('bank_account_debits');
				default:
					return null;
			}
		}.property(
			'type', 'debits', 'credits', 'holds', 'refunds',
			'card_debits', 'bank_account_debits'
		),

		results_base_uri: function() {
			return this.get('controllers.marketplace.invoices_uri');
		}.property('controllers.marketplace.invoices_uri')
	}
);
