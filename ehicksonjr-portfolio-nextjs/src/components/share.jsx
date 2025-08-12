import { useRouter } from 'next/router';
import {
  InstagramIcon,
  TwitterIcon,
  LinkedInIcon,
  RedditIcon,
  FacebookIcon
} from '@/components/SocialIcons';

const SocialShareButtons = () => {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  const title = "Title of your blog post";

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  const instagramShareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex">
      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="mx-2">
        <FacebookIcon />
      </a>
      <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="mx-2">
        <TwitterIcon />
      </a>
      <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="mx-2">
        <LinkedInIcon />
      </a>
      <a href={redditShareUrl} target="_blank" rel="noopener noreferrer" className="mx-2">
        <RedditIcon />
      </a>
      <a href={instagramShareUrl} target="_blank" rel="noopener noreferrer" className="mx-2">
        <InstagramIcon />
      </a>
    </div>
  );
};

export default SocialShareButtons;
