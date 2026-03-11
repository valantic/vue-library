let globalUuid = 0;

export type Uuid = {
  uuid: number;
};

/**
 * Logic can be used to add a unique id for every instance of a component.
 */
export const useUuid = (): Uuid => {
  globalUuid += 1;

  return {
    uuid: globalUuid,
  };
};
