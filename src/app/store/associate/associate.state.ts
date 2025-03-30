import { AssociateModel } from '../model/Associate.model';

export const associateState: AssociateModel = {
  list: [],
  associateObj: {
    id: 0,
    name: '',
    email: '',
    phone: '',
    type: 'CUSTOMER',
    address: '',
    associateGroup: 'Level-1',
    status: true,
  },
  errorMessage: '',
};
