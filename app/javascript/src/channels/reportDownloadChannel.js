import useAuthStore from "stores/useAuthStore";

export const subscribeToReportDownloadChannel = ({
  consumer,
  setProgress,
  generatePdf,
}) => {
  const { userId } = useAuthStore.getState().authUser;

  const reportDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "ReportDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        generatePdf();
      },
      received(data) {
        const { progress } = data;
        setProgress(progress);
      },
    }
  );

  return reportDownloadSubscription;
};
