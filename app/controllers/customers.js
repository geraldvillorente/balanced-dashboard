Balanced.CustomersController = Balanced.ObjectController.extend(
	Ember.Evented,
	Balanced.ResultsTable,
	Balanced.TransactionsTable, {
		needs: ['marketplace'],

		sortField: 'created_at',
		sortOrder: 'desc',

		baseClassSelector: "#customer",

		init: function() {
			var self = this;
			Balanced.Model.Events.on('didCreate', function(object) {
				if (Balanced.Transaction.prototype.isPrototypeOf(object)) {
					self.send('reload');
				}
			});
		},

		actions: {
			promptToDeleteBankAccount: function(bankAccount) {
				this.trigger('openDeleteBankAccountModal', bankAccount);
			},

			promptToDeleteCard: function(card) {
				this.trigger('openDeleteCardModal', card);
			},
		},

		results_base_uri: function() {
			return this.get('content.transactions_uri');
		}.property('content.transactions_uri')
	}
);
