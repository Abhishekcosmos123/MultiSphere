import { motion } from "framer-motion";
import Loader from "./loader";

const LoaderWithLabel = ({ label = "Loading..." }: { label?: string }) => (
  <motion.div
    className="flex flex-col items-center justify-center h-screen space-y-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Loader size="large" className="border-blue-500 border-t-transparent" />
    <p className="text-lg text-gray-600 font-medium">{label}</p>
  </motion.div>
);

export default LoaderWithLabel;
