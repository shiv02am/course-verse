import {
  Box,
  Button,
  Input,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { getAllCourses } from '../../../redux/actions/courseAction';
import { fileUploadCss } from '../../Auth/Register';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteLectureHandler,
  addLectureHandler,
  courseTitle,
  loading,
  lectures = [],
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const dispatch = useDispatch();

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const handleClose = async () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    await dispatch(getAllCourses());
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      size={'full'}
      onClose={handleClose}
      scrollBehavior={'outside'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my="5">
                <Heading children={courseTitle} /> <br />
                <Heading children={`#${id}`} size="sm" opacity={'0.4'} />
              </Box>
              <Heading children={'Lectures'} size="lg" />
              {lectures.map((l, i) => (
                <VideoCard
                  key={i}
                  title={l.title}
                  description={l.description}
                  num={i + 1}
                  lectureId={l._id}
                  courseId={id}
                  deleteLectureHandler={deleteLectureHandler}
                  loading={loading}
                />
              ))}
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add Lecture"
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <Input
                    accept="video/mp4"
                    required
                    type={'file'}
                    focusBorderColor="purple.500"
                    css={{
                      '&::file-selector-button': {
                        ...fileUploadCss,
                        color: 'purple',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}
                  <Button
                    isLoading={loading}
                    w="full"
                    colorScheme={'purple'}
                    type="submit"
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteLectureHandler,
  loading,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        {' '}
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>

      <Button
        isLoading={loading}
        color={'purple.600'}
        onClick={() => deleteLectureHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
