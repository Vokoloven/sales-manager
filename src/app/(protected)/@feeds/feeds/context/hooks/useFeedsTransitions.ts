import { useContext } from 'react';
import { FeedsTransitionContext } from '../FeedsTransition.context';

const useFeedsTransition = () => useContext(FeedsTransitionContext);

export { useFeedsTransition };
