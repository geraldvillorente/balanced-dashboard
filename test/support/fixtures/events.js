Balanced.Adapter.addFixtures([{
	"_type": "event",
	"callback_statuses": {
		"failed": 0,
		"retrying": 0,
		"pending": 0,
		"succeeded": 1
	},
	"occurred_at": "2013-08-23T00:39:52.460Z",
	"callbacks_uri": "/v1/events/EV861bf0500b8c11e3b9fb026ba7f8ec28/callbacks",
	"uri": "/v1/events/EV861bf0500b8c11e3b9fb026ba7f8ec28",
	"_uris": {
		"callbacks_uri": {
			"_type": "page",
			"key": "callbacks"
		}
	},
	"entity": {
		"invoice_uri": null,
		"precog_uri": "/v2/identities/IDeb05b632b0f611e1a929026ba7e239a9/bank_accounts/BAeae330c6b0f611e18199026ba7e5e72e/credits/CR85c16a720b8c11e3b768026ba7c1aba6",
		"meta": {},
		"account_name": null,
		"fee": null,
		"transaction_number": "CR167-644-5295",
		"id": "CR43zKEV69MJpUjf34IhATdS",
		"bank_account_uri": "/v1/bank_accounts/BA79gq9qP3HEoz1gLkVvtqZj",
		"state": "cleared",
		"customer_uri": "/v1/customers/AC79xjue8POkTUowEdmtTtFQ",
		"appears_on_statement_as": "example.com",
		"available_at": "2013-08-23T00:39:51.867Z",
		"status": "paid",
		"_type": "credit",
		"description": "",
		"events_uri": "/v1/credits/CR43zKEV69MJpUjf34IhATdS/events",
		"reversals_uri": "/v1/marketplaces/TEST-MP6afolN5BltWjYToP2BgQRU/credits/CR43zKEV69MJpUjf34IhATdS/reversals",
		"_uris": {
			"destination_uri": {
				"_type": "bank_account",
				"key": "destination"
			},
			"bank_account_uri": {
				"_type": "bank_account",
				"key": "bank_account"
			},
			"events_uri": {
				"_type": "page",
				"key": "events"
			},
			"reversals_uri": {
				"_type": "page",
				"key": "reversals"
			}
		},
		"destination_uri": "/v1/marketplaces/TEST-MP6afolN5BltWjYToP2BgQRU/accounts/AC79xjue8POkTUowEdmtTtFQ/bank_accounts/BA79gq9qP3HEoz1gLkVvtqZj",
		"created_at": "2013-08-23T00:39:51.281Z",
		"uri": "/v1/marketplaces/TEST-MP6afolN5BltWjYToP2BgQRU/accounts/AC79xjue8POkTUowEdmtTtFQ/credits/CR43zKEV69MJpUjf34IhATdS",
		"amount": 1000,
		"account_email_address": "robert.nozick45@yahoo.web",
		"account_uri": "/v1/marketplaces/TEST-MP6afolN5BltWjYToP2BgQRU/accounts/AC79xjue8POkTUowEdmtTtFQ"
	},
	"type": "credit.created",
	"id": "EV861bf0500b8c11e3b9fb026ba7f8ec28"
}]);
