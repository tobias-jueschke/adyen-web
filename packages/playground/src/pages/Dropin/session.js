import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/es/adyen.css';
import { createSession, makeDetailsCall } from '../../services';
import { amount, shopperLocale, shopperReference, countryCode, returnUrl } from '../../config/commonConfig';

export async function initSession() {
    const session = await createSession({
        amount,
        reference: `${Math.floor((1 + Math.random() * 10000000))}`,
        returnUrl,
        shopperLocale,
        shopperReference,
        countryCode,
        allowedPaymentMethods: ['visa','amex','mc']
    });

    console.log(session);

    const checkout = await AdyenCheckout({
        environment: process.env.__CLIENT_ENV__,
        clientKey: process.env.__CLIENT_KEY__,
        session,

        // Events
        beforeSubmit: (data, component, actions) => {
            console.log('beforeSubmit', data);
            actions.resolve(data);
        },
        onPaymentCompleted: (result, component) => {
            console.log('Save Order via Pub/Sub')
            console.log('onPaymentCompleted', result, component);
        },
        onAdditionalDetails: (result, component) => {
            console.log('onAdditionalDetails', result, component);
            makeDetailsCall(result.data);
            document.querySelector('#dropin-container').innerHTML = 'works ....';
        },
        onError: (error, component) => {
            console.error(error.message, component);
        },
    });

    const dropin = checkout
        .create('dropin', {})
        .mount('#dropin-container');
    return [checkout, dropin];
}
