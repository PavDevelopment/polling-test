import { IPollConfig } from './poll.models';
import { RandomJokeApiPollProcessor } from './poll.processors';

export const mockRandomJokeApiPollConfig: IPollConfig = {
  maxPollAttempts: 7,
  attemptsMade: 0,
  pollDelay: 1000,
  isPollRunning: true,
  pollStartDate: Date.now(),
  pollOptions: {
    interval: 0,
    attempts: 3,
    backoffStrategy: 'exponential',
    exponentialUnit: 3000, // 3 seconds
    backgroundPolling: true,
  },
  pollRequest$: null,
  pollUrl: 'https://icanhazdadjoke.com',
  pollHeaders: {
    accept: 'application/json',
  } as any,
  pollSuccessCondition: new RandomJokeApiPollProcessor(),
  pollResponse: null,
  id: 'joke-poll',
  logPoll: true
};

export const mockRandomJokeApiPollConfig2: IPollConfig = {
  maxPollAttempts: 7,
  attemptsMade: 0,
  pollDelay: 1000,
  isPollRunning: true,
  pollStartDate: Date.now(),
  pollOptions: {
    interval: 0,
    attempts: 3,
    backoffStrategy: 'exponential',
    exponentialUnit: 3000, // 3 seconds
    backgroundPolling: true,
  },
  pollRequest$: null,
  pollUrl: 'https://icanhazdadjoke.com',
  pollHeaders: {
    accept: 'application/json',
  } as any,
  pollSuccessCondition: new RandomJokeApiPollProcessor(),
  pollResponse: null,
  id: 'joke-poll-2',
  logPoll: true
};
