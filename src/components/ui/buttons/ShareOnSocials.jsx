import {
  Box,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import ModalWindow from '../modal/ModalWindow';
import { MdFacebook } from 'react-icons/md';
import { AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { BsMastodon } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import ReadOnlyInputWithCopyButton from '../Input/ReadOnlyInputWithCopyButton';

const ShareOnSocials = () => {
  const buttonColor = useColorModeValue('teal.500', 'teal.300');
  const buttonHoverColor = useColorModeValue('teal.600', 'teal.400');
  const articleUrl = useSelector(state => state.location);
  const copyURL = `https://matteo-dirollo.com/${articleUrl}`;


  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      copyURL
    )}`;
    window.open(url, '_blank');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      copyURL
    )}`;
    window.open(url, '_blank');
  };

  const handleMastodonShare = () => {
    const url = `https://share.naturalnews.com/link/${encodeURIComponent(copyURL)}`;
    window.open(url, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      copyURL
    )}`;
    window.open(url, '_blank');
  };

  return (
    <ModalWindow>
      <Box mt={20} mb={5}>
        <ReadOnlyInputWithCopyButton value={copyURL} />
      </Box>
      <HStack>
        <Box>
          <IconButton
            aria-label="facebook"
            variant="ghost"
            size="sm"
            isRound={true}
            color={buttonColor}
            _hover={{ color: `${buttonHoverColor}` }}
            onClick={handleFacebookShare}
            icon={<MdFacebook size="28px" />}
          />
        </Box>
        {/* SHARING BUTTONS */}
        <Box>
          <IconButton
            aria-label="twitter"
            variant="ghost"
            size="sm"
            isRound={true}
            color={buttonColor}
            _hover={{ color: `${buttonHoverColor}` }}
            onClick={handleTwitterShare}
            icon={<AiFillTwitterCircle size="28px" />}
          />
        </Box>
        <Box>
          <IconButton
            aria-label="mastodon"
            variant="ghost"
            size="sm"
            isRound={true}
            color={buttonColor}
            _hover={{ color: `${buttonHoverColor}` }}
            onClick={handleMastodonShare}
            icon={<BsMastodon size="28px" />}
          />
        </Box>
        <Box>
          <IconButton
            aria-label="linkedin"
            variant="ghost"
            size="sm"
            isRound={true}
            color={buttonColor}
            _hover={{ color: `${buttonHoverColor}` }}
            onClick={handleLinkedInShare}
            icon={<AiFillLinkedin size="28px" />}
          />
        </Box>
      </HStack>
    </ModalWindow>
  );
};

export default ShareOnSocials;
