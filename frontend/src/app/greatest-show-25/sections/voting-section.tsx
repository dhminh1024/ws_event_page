import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  type FC,
  useState,
} from "react";
import { cn } from "@/core/utils/shadcn-utils";
import { useLocales } from "@/core/hooks/use-locales";
import Typography from "@/app/happy-box/components/typography";
import { WSEGSFinalist } from "@/types/WellspringEventPage/WSEGSFinalist";
import { SecondaryButton, ThirdaryButton } from "../components/button";
import { HeartIcon, X } from "lucide-react";
import {
  useFinalists,
  useVotingSettings,
  useCastVote,
  useGetUser,
} from "../hooks/use-voting";

import { useDeviceFingerprint } from "@/core/hooks/use-device-fingerprint";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@atoms/dialog";
import CaretIcon from "../assets/images/caret.png";
import { LoginRequiredDialog } from "../components/login-required-dialog";
import { ConfirmVoteDialog } from "../components/confirm-vote-dialog";
import { useEventPageContext } from "@/lib/event-page/use-event-page";
import parser from "html-react-parser";
import Top1Badge from "../assets/images/top-1.png"
import Top2Badge from "../assets/images/top-2.png"
import Top3Badge from "../assets/images/top-3.png"

export type VotingSectionProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {};

interface FinalistCardProps {
  finalist: WSEGSFinalist;
  finalistIndex: number;
  rank: number; // Thứ hạng thực sự (1, 2, 3) dựa trên vote_count
  onVote: (finalistId: string, finalistName: string) => void;
  onViewVideo: (finalistIndex: number) => void;
  hasVotedForThisFinalist: boolean;
  hasVotedForAny: boolean;
  isVoting: boolean;
  showVoteCount: boolean;
  isVotingActive: boolean;
}

const FinalistCard: FC<FinalistCardProps> = ({
  finalist,
  finalistIndex,
  rank,
  onVote,
  onViewVideo,
  hasVotedForThisFinalist,
  hasVotedForAny,
  isVoting,
  showVoteCount,
  isVotingActive,
}) => {
  const { t } = useLocales();

  return (
    <div className={cn("relative", hasVotedForThisFinalist && "relative")}>
      {rank === 1 && (finalist?.vote_count || 0) > 0 && <img src={Top1Badge} alt="Top 1 Badge" className="absolute w-[50%] h-auto z-20 top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]" />}
      {rank === 2 && (finalist?.vote_count || 0) > 0 && <img src={Top2Badge} alt="Top 2 Badge" className="absolute w-[50%] h-auto z-20 top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]" />}
      {rank === 3 && (finalist?.vote_count || 0) > 0 && <img src={Top3Badge} alt="Top 3 Badge" className="absolute w-[50%] h-auto z-20 top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]" />}
      {/* Thumbnail */}
      <div
        className={cn(
          "group relative  w-full overflow-hidden bg-gs25-secondary p-5 md:p-10 rounded-[10rem] hover:scale-105 transition-transform duration-300",
          "before:content-[''] before:absolute before:inset-0 before:bg-gs25-gradient-2 before:bg-opacity-30 before:z-1"
        )}
      >
        {finalist.thumbnail ? (
          <img
            src={finalist.thumbnail}
            alt={finalist.finalist_name}
            className="w-full h-auto relative z-10 rounded-[10rem]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span className="text-[14rem]">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-16 md:p-24 text-center">
        {/* Finalist Name */}
        <Typography.Heading
          level={3}
          className="text-white text-[12rem] md:text-[24rem] font-bold mb-8 line-clamp-2 py-20 md:py-40"
        >
          {finalist.finalist_name}
        </Typography.Heading>

        <div className="flex flex-col gap-20 md:gap-60">
          {/* View Performance Button */}
          {finalist.video_url && (
            <div className="border-white border-[1rem] rounded-[6rem] md:rounded-[10rem]">
              <SecondaryButton
                onClick={() => onViewVideo(finalistIndex)}
                className="w-full h-auto p-[5rem_20rem] md:p-[16rem_24rem] text-[10rem] md:text-[18rem] bg-white/10 hover:bg-white/20 text-white rounded-[6rem] md:rounded-[8rem] transition-colors flex items-center justify-center gap-8"
              >
                {t("greatest_show_25.view_performance")}
              </SecondaryButton>
            </div>
          )}
          {/* Vote Button */}
          <div className="justify-between flex items-center border-white border-[1rem] rounded-[6rem] md:rounded-[10rem] p-[4rem_6rem] md:p-[7rem_8rem] ">
            {showVoteCount && (
              <div className="flex items-center justify-center">
                <HeartIcon
                  className="w-50 h-50 md:w-100 md:h-100 mr-10 md:mr-20"
                  fill={hasVotedForThisFinalist ? "red" : "white"}
                  color={hasVotedForThisFinalist ? "red" : "white"}
                />
                <span className="ml-8 text-white text-[12rem] md:text-[20rem] font-semibold">
                  {finalist.vote_count}
                </span>
              </div>
            )}
            <ThirdaryButton
              onClick={() => onVote(finalist.name, finalist.finalist_name)}
              disabled={!isVotingActive || hasVotedForAny || isVoting}
              className="p-[5rem_10rem] md:p-[8rem_18rem] h-80! md:h-130! m-0! rounded-[6rem]! text-[10rem] md:text-[18rem] disabled:opacity-50 disabled:cursor-not-allowed mb-12 italic"
            >
              {isVoting
                ? t("greatest_show_25.voting_button_loading")
                : hasVotedForThisFinalist
                ? t("greatest_show_25.voting_button_voted")
                : t("greatest_show_25.voting_button_vote")}
            </ThirdaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VotingSection = forwardRef<HTMLDivElement, VotingSectionProps>(
  ({ className, children, ...props }) => {
    const { t, currentLanguage } = useLocales();
    const event = useEventPageContext();
    const userStored = localStorage.getItem("gs25_social_user");
    // Social authentication

    const {
      userData,
      voted,
      isLoading: isAuthLoading,
      mutate: refetchUser,
    } = useGetUser(userStored, !userStored);
    const isAuthenticated = !!userData;
    const currentUserId = userData?.email || "";
    const isLoggedIn = isAuthenticated && !!currentUserId;

    // Device fingerprint for fraud prevention
    const { fingerprint: deviceFingerprint } = useDeviceFingerprint();

    // Video dialog state
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
    const [currentFinalistIndex, setCurrentFinalistIndex] = useState<number>(0);

    // Login dialog state
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

    // Confirm vote dialog state
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [pendingFinalistId, setPendingFinalistId] = useState<string>("");
    const [pendingFinalistName, setPendingFinalistName] = useState<string>("");

    // Fetch data using custom hooks
    const {
      finalists: apiFinalists,
      isLoading: isLoadingFinalists,
      refetch: refetchFinalists,
    } = useFinalists();
    const {
      isVotingActive,
      showVoteCount,
      isLoading: isLoadingSettings,
    } = useVotingSettings();

    // Use mock data for testing or real API data
    const finalists = apiFinalists;

    console.log("currentUserId", currentUserId);

    const { castVote, votingFinalistId } = useCastVote(currentUserId);

    // Check if user has voted for any finalist
    const hasVotedForAny = voted.length > 0;

    const handleVote = (finalistId: string, finalistName: string) => {
      // Check if user is logged in
      if (!isLoggedIn) {
        setIsLoginDialogOpen(true);
        return;
      }

      // Show confirm dialog
      setPendingFinalistId(finalistId);
      setPendingFinalistName(finalistName);
      setIsConfirmDialogOpen(true);
    };

    const handleConfirmVote = async () => {
      try {
        await castVote(pendingFinalistId, deviceFingerprint || undefined);
        // Close confirm dialog
        setIsConfirmDialogOpen(false);
        setPendingFinalistId("");
        setPendingFinalistName("");
        // Refresh data to get updated vote counts and user votes
        refetchFinalists();
        refetchUser();
      } catch (error) {
        console.error("Error casting vote:", error);
        // TODO: Show error toast
        setIsConfirmDialogOpen(false);
      }
    };

    const handleViewVideo = (finalistIndex: number) => {
      setCurrentFinalistIndex(finalistIndex);
      setIsVideoDialogOpen(true);
    };

    const handleLoginSuccess = () => {
      // Refetch user votes after successful login
      refetchUser();
      console.log("✅ User votes refetched after login");
    };

    const handlePrevFinalist = () => {
      if (currentFinalistIndex > 0) {
        setCurrentFinalistIndex(currentFinalistIndex - 1);
      }
    };

    const handleNextFinalist = () => {
      if (finalists && currentFinalistIndex < finalists.length - 1) {
        setCurrentFinalistIndex(currentFinalistIndex + 1);
      }
    };

    // Get current finalist data
    const currentFinalist = finalists[currentFinalistIndex];
    const currentVideoUrl = currentFinalist?.video_url || "";
    const currentVideoTitle = currentFinalist?.finalist_name || "";

    // Extract YouTube video ID from URL
    const getYouTubeEmbedUrl = (url: string) => {
      if (!url) return "";

      // Handle various YouTube URL formats
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
      }

      return url;
    };

    if(finalists.length === 0) return null
    return (
      <section
        className={cn("overflow-hidden bg-gs25-secondary bg-gs25-gradient-9", className)}
        {...props}
      >
        <div className="w-[90%] mx-auto py-80 md:py-160">
          {/* Section Heading */}
          <Typography.Heading className="text-center font-ethnocentric bg-gs25-gradient-5 bg-clip-text text-transparent text-[20rem] md:text-[65rem] uppercase font-normal mb-40 md:mb-80">
            {t("greatest_show_25.voting_heading")}
          </Typography.Heading>

          <center>
            <div className=" text-white text-[10rem] md:text-[14rem] text-center mb-80 md:mb-200">
              {parser(
                event?.variables[`voting_desc_${currentLanguage}`]?.value || ""
              )}
            </div>
          </center>

          {/* Loading State */}
          {(isLoadingFinalists || isLoadingSettings || isAuthLoading) && (
            <div className="text-center text-white text-[16rem]">
              {t("greatest_show_25.loading")}
            </div>
          )}

          {/* Grid of Finalists */}
          {!isLoadingFinalists &&
            !isLoadingSettings &&
            !isAuthLoading &&
            finalists &&
            finalists.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-24 md:gap-240">
                {(() => {
                  // Sort finalists by vote count descending
                  const sortedFinalists = [...finalists].sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));

                  // Get unique vote counts sorted descending to determine rank levels
                  // Example: [100, 80, 60, 40] -> rank 1 = 100, rank 2 = 80, rank 3 = 60, rank 4 = 40
                  const uniqueVoteCounts = [...new Set(sortedFinalists.map(f => f.vote_count || 0))].sort((a, b) => b - a);

                  // Calculate rank based on unique vote count position
                  // Same vote_count = same rank
                  const getRank = (voteCount: number): number => {
                    const rankIndex = uniqueVoteCounts.indexOf(voteCount);
                    return rankIndex + 1; // rank starts from 1
                  };

                  return sortedFinalists.map((finalist, index) => (
                    <FinalistCard
                      key={finalist.name}
                      finalist={finalist}
                      finalistIndex={index}
                      rank={getRank(finalist.vote_count || 0)}
                      onVote={handleVote}
                      onViewVideo={handleViewVideo}
                      hasVotedForThisFinalist={voted.includes(finalist.name)}
                      hasVotedForAny={hasVotedForAny}
                      isVoting={votingFinalistId === finalist.name}
                      showVoteCount={showVoteCount}
                      isVotingActive={isVotingActive}
                    />
                  ));
                })()}
              </div>
            )}

          {/* Empty State */}
          {!isLoadingFinalists &&
            !isLoadingSettings &&
            !isAuthLoading &&
            (!finalists || finalists.length === 0) && (
              <div className="text-center text-white text-[16rem]">
                {t("greatest_show_25.no_finalists")}
              </div>
            )}
        </div>

        {/* Video Dialog */}
        <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
          <DialogContent className="max-w-[90vw] md:max-w-[1920px] bg-transparent border-none pointer-events-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsVideoDialogOpen(false)}
              className="absolute right-[5%] cursor-pointer top-0 z-20 text-white hover:text-gs25-primary transition-colors p-8"
              aria-label="Close dialog"
            >
              <X className="w-[32rem] h-[32rem] md:w-[48rem] md:h-[48rem]" />
            </button>

            <DialogHeader>
              <DialogTitle className="text-white text-center mb-80 text-[16rem] md:text-[30rem]">
                {currentVideoTitle}
              </DialogTitle>
            </DialogHeader>
            <div className="relative w-full">
              {/* Previous Button */}
              {currentFinalistIndex > 0 && (
                <button
                  onClick={handlePrevFinalist}
                  className="absolute left-0 md:left-[2%] cursor-pointer duration-300 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform"
                  aria-label="Previous finalist"
                >
                  <img
                    src={CaretIcon}
                    alt="Previous"
                    className="w-[40rem] h-[40rem] md:w-400 md:h-400"
                  />
                </button>
              )}

              <div className="w-[75%] mx-auto">
                {/* Video iframe */}
                <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={getYouTubeEmbedUrl(currentVideoUrl)}
                    title={currentVideoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Vote Section in Dialog */}
                {currentFinalist && (
                  <div className="mt-24 md:mt-40 flex justify-between items-center border-white border-[1rem] rounded-[10rem] p-[7rem_8rem]">
                    {showVoteCount && (
                      <div className="flex items-center justify-center">
                        <HeartIcon
                          className="w-50 h-50 md:w-100 md:h-100 mr-10 md:mr-20"
                          fill={voted.includes(currentFinalist.name) ? "red" : "white"}
                          color={voted.includes(currentFinalist.name) ? "red" : "white"}
                        />
                        <span className="ml-8 text-white text-[14rem] md:text-[20rem] font-semibold">
                          {currentFinalist.vote_count}
                        </span>
                      </div>
                    )}
                    <ThirdaryButton
                      onClick={() =>
                        handleVote(
                          currentFinalist.name,
                          currentFinalist.finalist_name
                        )
                      }
                      disabled={
                        !isVotingActive ||
                        hasVotedForAny ||
                        votingFinalistId === currentFinalist.name
                      }
                      className="p-[12rem_20rem] md:p-[8rem_18rem] h-130! m-0! rounded-[6rem]! text-[12rem] md:text-[18rem] disabled:opacity-50 disabled:cursor-not-allowed italic"
                    >
                      {votingFinalistId === currentFinalist.name
                        ? t("greatest_show_25.voting_button_loading")
                        : voted.includes(currentFinalist.name)
                        ? t("greatest_show_25.voting_button_voted")
                        : t("greatest_show_25.voting_button_vote")}
                    </ThirdaryButton>
                  </div>
                )}
              </div>

              {/* Next Button */}
              {finalists && currentFinalistIndex < finalists.length - 1 && (
                <button
                  onClick={handleNextFinalist}
                  className="absolute right-0 md:right-[2%] cursor-pointer duration-300 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform"
                  aria-label="Next finalist"
                >
                  <img
                    src={CaretIcon}
                    alt="Next"
                    className="w-[40rem] h-[40rem] md:w-400 md:h-400  rotate-180"
                  />
                </button>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Login Required Dialog */}
        <LoginRequiredDialog
          open={isLoginDialogOpen}
          onOpenChange={setIsLoginDialogOpen}
          onLogin={handleLoginSuccess}
        />

        {/* Confirm Vote Dialog */}
        <ConfirmVoteDialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
          finalistName={pendingFinalistName}
          onConfirm={handleConfirmVote}
          isLoading={votingFinalistId === pendingFinalistId}
        />
      </section>
    );
  }
);
