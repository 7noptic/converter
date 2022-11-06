import ConverterModeTypes from '~/components/AppConverter/converter-mode.types';

export default interface ConverterAddTypes {
    type: ConverterModeTypes;
    success: Boolean;
    files: File[];
}