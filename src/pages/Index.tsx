
import AnimatedCounter from '@/components/AnimatedCounter';
import CursorFollower from '@/components/CursorFollower';

const Index = () => {
  return (
    <>
      <CursorFollower />
      <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <article className="space-y-6 text-lg leading-relaxed">
          <h1 className="text-xl font-medium text-foreground">
            Your Name
          </h1>
          
          <p className="text-foreground">
            Working at{' '}
            <a 
              href="#" 
              className="underline decoration-1 underline-offset-4 hover:text-muted transition-colors"
            >
              Your Company®
            </a>
            .
          </p>

          <p className="text-foreground">
            Previously an independent contractor, I collaborated with{' '}
            <a 
              href="#" 
              className="underline decoration-1 underline-offset-4 hover:text-muted transition-colors"
            >
              Client One
            </a>
            ,{' '}
            <a 
              href="#" 
              className="underline decoration-1 underline-offset-4 hover:text-muted transition-colors"
            >
              Client Two
            </a>
            ,{' '}
            <a 
              href="#" 
              className="underline decoration-1 underline-offset-4 hover:text-muted transition-colors"
            >
              Client Three
            </a>
            {' '}and{' '}
            <a 
              href="#" 
              className="underline decoration-1 underline-offset-4 hover:text-muted transition-colors"
            >
              Client Four
            </a>
            {' '}along with dozens of other brands. Over the last 7 days, well over
          </p>

          <div className="py-4">
            <AnimatedCounter targetNumber="179,305" />
          </div>

          <p className="text-foreground">
            people have used websites or services I made singlehandedly.
          </p>

          <p className="text-foreground pt-4">
            Message me on{' '}
            <a 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-4 hover:text-muted transition-colors"
            >
              Twitter
            </a>
            {' '}or by{' '}
            <a 
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-1 underline decoration-1 underline-offset-4 hover:text-muted transition-colors"
            >
              email
            </a>
            .
          </p>
        </article>
      </div>
    </main>
    </>
  );
};

export default Index;
