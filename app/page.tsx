import { Counter } from "./Counter";
import { CounterButtons } from "./CounterButtons";

export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col items-center justify-center space-y-4">
          <div>
            <h1 className="text-5xl font-bold">NextJs</h1>
            <p className="text-2xl">Form builder project</p>
          </div>
          <div>
            <Counter />
          </div>

          <CounterButtons />
        </div>
      </div>
    </div>
  );
}
