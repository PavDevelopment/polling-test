import { IJokeResponse, IPollProcessor } from './poll.models';

export class RandomJokeApiPollProcessor
  implements IPollProcessor<IJokeResponse>
{
  processPollRequest(pollResponse: IJokeResponse): {
    notification: string;
    isSuccess: boolean;
  } {
    return pollResponse?.joke
      ? { notification: pollResponse.joke, isSuccess: true }
      : { notification: '', isSuccess: false };
  }
}
