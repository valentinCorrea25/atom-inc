import Loader from '../ui/loader'

const LoadingState = () => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <Loader />
      <p className="text-lg font-bold text-[#10b981]">Connecting to Server...</p>
    </div>
  </div>
)

export default LoadingState
