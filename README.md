# Yarn Inventory Feature

## Description
The Yarn Inventory feature allows users to manage their yarn collection and purchase history. Users can:
- Add details about their yarn, including brand, yards per ball, and purchase history.
- Track the total cost spent on yarns at different levels (individual yarns, brands, and overall).
- Organize their stash effectively with filtering and search functionality.

## Planned Features
1. **Add Yarn**:
   - Form to add yarn details including:
     - Brand
     - Yarn Name
     - Color
     - Weight (e.g., DK, Worsted)
     - Fiber content (e.g., Wool, Cotton)
     - Yards per Ball
     - Cost
     - Date Purchased

2. **View Yarn Inventory**:
   - Display all yarn entries in a table or card format.
     - Include calculated field: **Number of Balls** = `Total Yards / Yards Per Ball`.
   - Include fields such as:
     - Name
     - Color
     - Weight
     - Remaining Yards
     - Number of Balls
     - Cost per Ball
     - Total Spent
   - Allow sorting by brand, yarn name, color, weight

3. **Purchase History**:
   - Log each purchase made for a yarn.
   - Track purchase details:
     - Quantity purchased (number of balls)
     - Cost per Ball
     - Date of Purchase
   - Automatically calculate total cost for:
     - Each purchase
     - Each yarn
     - Each brand
     - All yarns by month and year

4. **Reports**:
   - Generate monthly and yearly reports showing:
     - Total yarn purchased.
     - Total spent on yarn.
     - Breakdown of spending by yarn and brand. 

5. **Update Yarn Details**:
   - Update the amount of yarn used for projects.
   - Automatically calculate and display remaining yards and number of balls.

6. **Delete Yarn Entries**:
   - Allow users to delete unwanted yarn entries from the inventory.

7. **Filter and Search**:
   - Provide options to filter yarn by weight, color, or brand.
   - Add a search bar to quickly find specific yarn entries.

## Progress
- [ ] Set up Firestore collection for storing yarn data (`yarn_inventory`) and purchase history (`yarn_purchases`).
- [ ] Implement "Add Yarn" form with purchase history logging.
- [ ] Create "View Yarn Inventory" UI with total cost calculations.
- [ ] Enable updating yarn usage and purchase history.
- [ ] Add functionality to delete yarn entries and purchase logs.
- [ ] Add filter and search functionality.
- [ ] Generate monthly and yearly reports.

## Database Schema
### Firestore Collection: `yarn_inventory`
Each document in the collection will represent a yarn entry and include the following fields:
| Field            | Type      | Description                               |
|-------------------|-----------|-------------------------------------------|
| `brand`          | `string`  | Name of the yarn brand                   |
| `name`           | `string`  | Name of the yarn base                    |
| `color`          | `string`  | Yarn color                               |
| `weight`         | `string`  | Yarn weight (e.g., DK, Worsted)          |
| `fiber_content`  | `array`   | Array of objects representing fiber types|
| `yards_per_ball` | `number`  | Yards in a single ball                   |
| `remaining_yards`| `number`  | Yards of yarn remaining after usage      |
| `number_of_balls`| `number`  | Calculated field: Remaining Balls of Yarn|
| `cost_per_ball`  | `number`  | Cost per ball of yarn                    |
| `total_spent`    | `number`  | Total spent on this yarn                 |
| `date_purchased` | `timestamp`| Date the yarn was purchased              |

#### Fiber Content Field Format
The `fiber_content` field will store an array of objects. Each object will include:
| Key        | Type      | Description                          |
|------------|-----------|--------------------------------------|
| `fiber`    | `string`  | Type of fiber (e.g., Wool, Nylon)    |
| `percentage`| `number`  | Percentage of the fiber composition |

##### Example: 
```json
"fiber_content": [
  { "fiber": "Wool", "percentage": 75 },
  { "fiber": "Nylon", "percentage": 25 }
]
```

### Firestore Collection: `yarn_purchases`
Each document in the collection will represent a single yarn purchase and include the following fields:
| Field            | Type      | Description                               |
|-------------------|-----------|-------------------------------------------|
| `yarn_id`        | `string`  | ID of the yarn in `yarn_inventory`        |
| `quantity`       | `number`  | Number of balls purchased                |
| `cost_per_ball`  | `number`  | Cost per ball of yarn                    |
| `total_cost`     | `number`  | Total cost for this purchase             |
| `date_purchased` | `timestamp`| Date of the purchase                     |

## Calculations
1. **Number of Balls**: `Remaining Yards / Yards Per Ball`
2. **Total Spent on a Yarn**: Sum of `total_cost` for all purchases linked to `yarn_id`.
3. **Total Spent on a Brand**: Sum of `total_cost` for all purchases linked to yarns of the same brand.
4. **Total Spent Across All Yarns**:
   - Monthly: Filter purchases by `date_purchased` (month).
   - Yearly: Filter purchases by `date_purchased` (year).

## Next Steps
1. Set up the Firestore database with `yarn_inventory` and `yarn_purchases` collections.
2. Create a form for adding new yarn and logging purchase history.
3. Build the UI for displaying the inventory with calculated fields (e.g., `number_of_balls`, `total_spent`).
4. Add functionality to edit yarn details and log additional purchases.
5. Generate reports for monthly and yearly spending.

## Notes
- Use Firestore queries to aggregate purchase data for reports.
- Consider adding graphs or visualizations to enhance the reporting feature.
- Yarn images can be added as an enhancement in the future.
