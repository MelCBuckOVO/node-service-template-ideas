// here: typing the code objects cuts down dev errors
export type Logger = {
  error(context: string, message: string): void;
  info(context: string, message: string): void;
};

// here: programming to abstractions enables us to inject different 'type-safe' implementations into the code that needs them
// e.g. a real repo for production code
// e.g. a stubbed repo for test code
export type MeterRepository = {
  getMeterFromDb(id: string): { name: string; fuelType: string };
};
