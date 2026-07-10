import { createApp } from "./app";
import { serveStatic } from "./static";
import { log } from "./log";

const port = parseInt(process.env.PORT || '3000', 10);

createApp().then(({ app, server }) => {
  serveStatic(app);
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
});
