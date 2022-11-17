import React from 'react';
import Pet from './Pet';

const PetSelector = () => {
  return (
    <>
      <Pet type={'Dog'} />
      <Pet type={'Cat'} />
      <Pet type={'Rabbit'} />
      <Pet type={'Fox'} />
      <Pet type={'Reindeer'} />
      <Pet type={'PolarBear'} />
      <Pet type={'Tortoise'} />
      <Pet type={'Rhino'} />
    </>
  );
};

export default PetSelector;
