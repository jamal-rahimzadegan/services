import React, { useEffect } from 'react';
import WorkerService from './web-worker-service/worker-service';
import testWorkerFile from './web-worker-service/test-worker';

let testWorker;

export default function Home() {
  const handleWorker = () => {
    testWorker = new WorkerService(testWorkerFile);
    testWorker.onmessage = (e) => {
      console.log(`--- data ----> `, e.data);
    };
  };

  useEffect(handleWorker, []);

  return (
    <>
      <button onClick={() => testWorker.postMessage(0 ? 100_000 : 50)}>Run a heavy task</button>
      <p>Can you click and select me without problem?</p>
    </>
  );
}
