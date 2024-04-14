const { z } = require("zod");

const completedTripsSchema = z.object({
  companyId: z.string().min(1),
  driverId: z.string().min(1),
  pickUpPoint: z.string().min(1),
  destination: z.string().min(1),
  departureTime: z.string().min(1),
  banner: z.string().optional(),
  passngerIds: z.array(z.string()).optional(),
  Status: z.string().optional(),
  tripRating: z.number().optional()
});

module.exports = completedTripsSchema;
