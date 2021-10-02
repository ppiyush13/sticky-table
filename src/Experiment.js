import { useLayoutEffect, useState } from 'react';

export const Experiment = () => {
  const [state, setState] = useState(true);
  const onButtonClick = () => {
    setState(false);
  };

  return (
    <>
      <button onClick={onButtonClick}>Click to vanish</button>
      {state ? <Comp /> : null}
    </>
  );
};

const Comp = () => {
  useLayoutEffect(() => {
    console.log('Use Layout effect');

    return () => console.log('Unmount layout effect');
  });

  return <div>Experiment</div>;
};
