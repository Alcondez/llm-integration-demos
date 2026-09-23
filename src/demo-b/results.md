┌─────────┬──────────┬───────┬───────────┬──────────────┬────────────┐
│ (index) │ effort   │ ok    │ latencyMs │ outputTokens │ stop       │
├─────────┼──────────┼───────┼───────────┼──────────────┼────────────┤
│ 0       │ 'low'    │ true  │ 5687      │ 374          │ 'end_turn' │
│ 1       │ 'low'    │ true  │ 5530      │ 432          │ 'end_turn' │
│ 2       │ 'low'    │ true  │ 7023      │ 483          │ 'end_turn' │
│ 3       │ 'low'    │ false │ 5743      │ 387          │ 'end_turn' │
│ 4       │ 'low'    │ true  │ 4754      │ 324          │ 'end_turn' │
│ 5       │ 'low'    │ true  │ 4749      │ 395          │ 'end_turn' │
│ 6       │ 'low'    │ true  │ 2837      │ 139          │ 'end_turn' │
│ 7       │ 'low'    │ true  │ 6278      │ 344          │ 'end_turn' │
│ 8       │ 'low'    │ false │ 4517      │ 338          │ 'end_turn' │
│ 9       │ 'low'    │ false │ 5161      │ 306          │ 'end_turn' │
│ 10      │ 'medium' │ true  │ 10739     │ 956          │ 'end_turn' │
│ 11      │ 'medium' │ true  │ 8578      │ 710          │ 'end_turn' │
│ 12      │ 'medium' │ true  │ 6684      │ 528          │ 'end_turn' │
│ 13      │ 'medium' │ true  │ 9180      │ 713          │ 'end_turn' │
│ 14      │ 'medium' │ true  │ 7259      │ 669          │ 'end_turn' │
│ 15      │ 'medium' │ true  │ 7187      │ 630          │ 'end_turn' │
│ 16      │ 'medium' │ true  │ 7765      │ 616          │ 'end_turn' │
│ 17      │ 'medium' │ true  │ 7065      │ 587          │ 'end_turn' │
│ 18      │ 'medium' │ true  │ 6379      │ 530          │ 'end_turn' │
│ 19      │ 'medium' │ true  │ 6202      │ 575          │ 'end_turn' │
│ 20      │ 'high'   │ true  │ 11965     │ 1158         │ 'end_turn' │
│ 21      │ 'high'   │ true  │ 12658     │ 1203         │ 'end_turn' │
│ 22      │ 'high'   │ true  │ 13622     │ 1316         │ 'end_turn' │
│ 23      │ 'high'   │ true  │ 9455      │ 913          │ 'end_turn' │
│ 24      │ 'high'   │ true  │ 11616     │ 1132         │ 'end_turn' │
│ 25      │ 'high'   │ true  │ 14678     │ 1374         │ 'end_turn' │
│ 26      │ 'high'   │ true  │ 13966     │ 1348         │ 'end_turn' │
│ 27      │ 'high'   │ true  │ 12651     │ 1204         │ 'end_turn' │
│ 28      │ 'high'   │ true  │ 15126     │ 1360         │ 'end_turn' │
│ 29      │ 'high'   │ true  │ 21900     │ 2074         │ 'end_turn' │
└─────────┴──────────┴───────┴───────────┴──────────────┴────────────┘
┌─────────┬────────┬────────────┬────────────┐
│ (index) │ effort │ stop       │ answerTail │
├─────────┼────────┼────────────┼────────────┤
│ 0       │ 'low'  │ 'end_turn' │ 'C-L'      │
│ 1       │ 'low'  │ 'end_turn' │ 'A-C-K'    │
│ 2       │ 'low'  │ 'end_turn' │ ''         │
└─────────┴────────┴────────────┴────────────┘
┌─────────┬──────────┬──────────┬─────────────────┬──────────────────┬───────────────┐
│ (index) │ effort   │ accuracy │ medianLatencyMs │ meanOutputTokens │ estimatedCost │
├─────────┼──────────┼──────────┼─────────────────┼──────────────────┼───────────────┤
│ 0       │ 'low'    │ '7/10'   │ 5346            │ 352              │ '$0.0478'     │
                                                                                                                                                       │ 1       │ 'medium' │ '10/10'  │ 7223            │ 651              │ '$0.0777'     │
│ 2       │ 'high'   │ '10/10'  │ 13140           │ 1308             │ '$0.1434'     │                                                                                                                                                       └─────────┴──────────┴──────────┴─────────────────┴──────────────────┴───────────────┘