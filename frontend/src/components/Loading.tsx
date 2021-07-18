import { ProgressCircular } from "ui-neumorphism";

const Loading = () => (
  <div className="loading">
    <ProgressCircular style={{position: 'absolute', top: '45%'}} indeterminate color='var(--info)' />
  </div>
);

export default Loading;