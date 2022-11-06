import ConverterAddTypes from '~/components/AppConverter/converter-add.types';
import User from '~/types/user/user.type';

export default interface ConversionsTypes extends ConverterAddTypes {
    id: number,
    userId: Pick<User, 'id'>,
}