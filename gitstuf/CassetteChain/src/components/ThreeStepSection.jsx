import { Music, MessageCircleHeart, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const ThreeStepSection = () => {
  const steps = [
    {
      icon: <Music size={48} className="text-plum" />,
      title: 'Choose Songs',
      description: 'Pick your favorite Spotify songs that speak your heart.',
    },
    {
      icon: <MessageCircleHeart size={48} className="text-pink-500" />,
      title: 'Write Secret Messages',
      description: 'Add heartfelt notes that unlock when the songs are played.',
    },
    {
      icon: <Gift size={48} className="text-rose-400" />,
      title: 'Send as NFT',
      description: 'Send it as a magical NFT to your special someone.',
    },
  ];

  return (
    <section className="py-3 mt-3 text-center">
      <h2 className="text-4xl font-bold text-plum mb-12 font-sans">How It Works 💌</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-4 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center p-6 rounded-xl shadow-xl bg-gradient-to-br from-pink-100 via-rose-50 to-violet-100 w-72"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ThreeStepSection;
