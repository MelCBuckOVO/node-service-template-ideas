// here: typing the code objects cuts down dev errors
export type Logger = {
  error(context: string, message: string): void;
  info(context: string, message: string): void;
};

// here: programming to abstractions enables us to inject different 'type-safe' implementations into the code that needs them
// e.g. a real repo for production code
// e.g. a stubbed repo for test code
export type MeterRepository = {
  getMeterFromExternalService(id: string): Meter;
};

export type User = {
  bank_name: string;
} & UserAccount;

export type UserAccount = {
  name: string;
  email: string;
};

export type UserFinancials = {
  user_name: string;
  bank_name: string;
};

export type UserRepository = {
  getUserFromExternalService(id: string): UserAccount;
  getUserFinancialsFromExternalService(id: string): UserFinancials;
};

export type Meter = {
  name: string;
  fuel_type: string;
};

export type MeterService = {
  getMeter(id: string): Meter;
};

export type UserService = {
  getUser(id: string): User;
};
