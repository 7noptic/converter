import PushTypes from '~/types/ui/push.types';

export default interface IPush {
    text: string;
    type?: PushTypes;
}