import React from 'react';
import _ from 'lodash';
import DetailListItem from './DetailListItem';

const DetailList = ({itemInfo, child}) => (
  <>
    <ul style={child ? {margin: '0'} : {}}>
      {
        Object.keys(itemInfo).map((item) => (
          (_.isObject(itemInfo[item][1]))
            ? (// info is another object with information, not just string
              <DetailListItem
                key={item}
                name={itemInfo[item][0]}
                info={<DetailList itemInfo={itemInfo[item][1]} child />}
              />
            )
            : (// info is string
              <DetailListItem key={item} name={itemInfo[item][0]} info={itemInfo[item][1]} />
            )

        ))
      }
    </ul>
  </>
);

export default DetailList;
