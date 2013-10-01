Balanced.CreditCustomerModalView = Balanced.View.extend({
	templateName: 'modals/credit_customer',

	dollar_amount: null,

	actions: {
		open: function() {
			var bankAccounts = this.get('customer.bank_accounts');
			var bank_account_uri = (bankAccounts && bankAccounts.get('length') > 0) ? bankAccounts.get('content')[0].get('uri') : null;

			var credit = Balanced.Credit.create({
				uri: this.get('customer.credits_uri'),
				bank_account_uri: bank_account_uri,
				amount: null
			});

			this.set('dollar_amount', null);
			this.set('model', credit);

			$('#credit-customer').modal({
				manager: this.$()
			});
		},

		save: function() {
			if (this.get('model.isSaving')) {
				return;
			}

			var credit = this.get('model');

			var cents = null;
			try {
				cents = Balanced.Utils.dollarsToCents(this.get('dollar_amount'));
			} catch (error) {
				credit.set('validationErrors', {
					'amount': error
				});
				return;
			}
			credit.set('amount', cents);

			var self = this;
			credit.save().then(function(credit) {
				$('#credit-customer').modal('hide');
				self.get('controller').transitionToRoute('credits', credit);
			});
		}
	},

	selected_funding_instrument: function() {
		if (this.get('model.bank_account_uri')) {
			var self = this;
			return this.get('customer.bank_accounts').find(function(b) {
				return self.get('model.bank_account_uri') === b.get('uri');
			});
		}
	}.property('model.bank_account_uri', 'customer.bank_accounts')
});
