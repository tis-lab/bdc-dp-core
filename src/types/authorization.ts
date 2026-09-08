//  "ga4gh_passport_v1": [
//     {
//         "iat": 1580000100,
//         "exp": 1581168872,
//         ...
//         "ga4gh_visa_v1": {
//             "type": "ControlledAccessGrants",
//             "asserted": 1549632872,
//             "value": "https://example-institute.org/datasets/710",
//             "source": "https://grid.ac/institutes/grid.0000.0a",
//             "by": "dac"
//         }
//     },
//   ]

export interface DatasetAccessResult {
  datasetId: string;
  authorized: boolean;
}
