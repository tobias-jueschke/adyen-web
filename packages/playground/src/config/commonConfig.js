import getCurrency from './getCurrency';
import { getSearchParameters } from '../utils';

const DEFAULT_LOCALE = 'de-DE';
const DEFAULT_COUNTRY = 'DE';
const DEFAULT_CURRENCY = 'EUR'

const urlParams = getSearchParameters(window.location.search);
const merchantAccount = urlParams.merchantAccount;
export const shopperLocale = urlParams.shopperLocale || DEFAULT_LOCALE;
export const countryCode = urlParams.countryCode || DEFAULT_COUNTRY;
export const currency = DEFAULT_CURRENCY || getCurrency(countryCode);
export const amountValue = urlParams.amount ?? 25900;
export const shopperReference = `${Math.floor((1 + Math.random() * 1000))}`;
export const amount = {
    currency,
    value: Number(amountValue)
};

export const useSession = urlParams.session !== 'manual';

export const returnUrl = 'http://localhost:3020/result';

export default {
    amount,
    countryCode,
    shopperLocale,
    channel: 'Web',
    shopperReference,
    ...(merchantAccount && { merchantAccount })
};
