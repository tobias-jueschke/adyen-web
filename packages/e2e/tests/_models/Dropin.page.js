import { ClientFunction, Selector } from 'testcafe';
import BasePage from './BasePage';

/**
 * Expects a 'components' property in the object sent to the constructor containing instances of other Page models
 * e.g.
 * const dropinPage = new DropinPage({
 *   components: {
 *     cc: new CardComponentPage('.adyen-checkout__payment-method--bcmc')
 *   }
 * });
 */
export default class DropinPage extends BasePage {
    constructor({ components }) {
        super('');

        Object.assign(this, components);

        const BASE_EL = '.adyen-checkout__dropin';

        /**
         * ###############################################
         * Credit card related (but only appear in Dropin)
         * ###############################################
         */
        // Regular branding
        this.brandsHolder = Selector(`${BASE_EL} .adyen-checkout__payment-method__brands`);
        this.brandsImages = this.brandsHolder.find('img');

        // Dual branding
        this.dualBrandingIconHolder = Selector(`${BASE_EL} .adyen-checkout__card__dual-branding__buttons`);
        this.dualBrandingIconHolderActive = Selector(`${BASE_EL} .adyen-checkout__card__dual-branding__buttons--active`);
        this.dualBrandingImages = this.dualBrandingIconHolderActive.find('img');
    }

    getFromState = ClientFunction(path => {
        const splitPath = path.split('.');
        const reducer = (xs, x) => (xs && xs[x] !== undefined ? xs[x] : undefined);

        return splitPath.reduce(reducer, window.dropin.dropinRef.state.activePaymentMethod.state);
    });
}