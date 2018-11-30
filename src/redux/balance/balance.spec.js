import { createStore } from 'redux'

import { CURRENCY_CHF, CURRENCY_EUR, CURRENCY_GBP, CURRENCY_USD } from './constants'
import { depositMoney, withdrawMoney, changeCurrencyRate } from './actions'
import { balance, rates, combined } from './reducers'

describe('Redux Bank Account', () => {

    describe('Balance only', () => {
        it('can deposit and withdraw money with single currency (PLN)', () => {
            let store = createStore(balance)

            expect(store.getState()).toEqual(0)
            store.dispatch(depositMoney(10000))
            expect(store.getState()).toEqual(10000)
            store.dispatch(depositMoney(500))
            expect(store.getState()).toEqual(10500)
            store.dispatch(withdrawMoney(5000))
            expect(store.getState()).toEqual(5500)
            store.dispatch(withdrawMoney(10000))
            expect(store.getState()).toEqual(-4500)
        })
    })

    describe('Currency Rates only', () => {
        it('can change currency rates', () => {
            let store = createStore(rates)

            expect(store.getState()).toEqual({
                USD: 4.00535115,
                EUR: 4.23939572,
                GBP: 4.99995995,
                CHF: 3.97592784
            })

            store.dispatch(changeCurrencyRate(3.60074309, CURRENCY_CHF))
            expect(store.getState()).toEqual({
                USD: 4.00535115,
                EUR: 4.23939572,
                GBP: 4.99995995,
                CHF: 3.60074309
            })

            store.dispatch(changeCurrencyRate(4.20496302, CURRENCY_EUR))
            expect(store.getState()).toEqual({
                USD: 4.00535115,
                EUR: 4.20496302,
                GBP: 4.99995995,
                CHF: 3.60074309
            })

            store.dispatch(changeCurrencyRate(4.74025974, CURRENCY_GBP))
            expect(store.getState()).toEqual({
                USD: 4.00535115,
                EUR: 4.20496302,
                GBP: 4.74025974,
                CHF: 3.60074309
            })

            store.dispatch(changeCurrencyRate(3.40866483, CURRENCY_USD))
            expect(store.getState()).toEqual({
                USD: 3.40866483,
                EUR: 4.20496302,
                GBP: 4.74025974,
                CHF: 3.60074309
            })
        })
    })

    describe('Balance and Rates combined', () => {
        it('can deposit and withdraw money with different currencies', () => {
            let store = createStore(combined)

            store.dispatch(depositMoney(10000))
            expect(store.getState().balance).toEqual(10000)
            store.dispatch(depositMoney(1000, CURRENCY_GBP))
            expect(store.getState().balance).toEqual(14999.96)
            store.dispatch(changeCurrencyRate(4.21237562, CURRENCY_EUR))
            store.dispatch(withdrawMoney(99.90, CURRENCY_EUR))
            expect(store.getState().balance).toEqual(14579.14)
            store.dispatch(changeCurrencyRate(4.22016485, CURRENCY_EUR))
            store.dispatch(withdrawMoney(179.0, CURRENCY_EUR))
            expect(store.getState().balance).toEqual(13823.73)
            store.dispatch(changeCurrencyRate(4.74924372, CURRENCY_GBP))
            store.dispatch(depositMoney(1000, CURRENCY_GBP))
            expect(store.getState().balance).toEqual(18572.97)
        })
    })

})
