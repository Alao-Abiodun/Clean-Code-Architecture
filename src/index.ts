import { StatusCodes } from 'http-status-codes';
import app from './app';
import  pgClient  from './config/database.config';
import AppError from './utils/lib/appError';


try {
    
    const port = Number(process.env.PORT) || 6001;
    // spin off the server
    app.listen(port, () => {
        console.clear();
        console.log(
            `🚀  Patient service is ready at: http://localhost:${port}`
        );
    });

    // pgClient.connect(error => {
    //     if (error) throw new AppError("Unable to connect", StatusCodes.SERVICE_UNAVAILABLE);
    //     console.log("Connected")
    // })

    pgClient.connect()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      throw new AppError("Unable to connect", StatusCodes.SERVICE_UNAVAILABLE);
    });

} catch (error) {
    process.exit();
}

process.on("SIGINT", async() => {
    process.exit(0);
})

process.on("uncaughtException", async () => {
    process.exit(1);
})

process.on("unhandledRejection", async () => {
    process.exit(1);
})