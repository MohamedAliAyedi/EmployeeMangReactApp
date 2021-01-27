/*import React, { useState }  from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
  const Datatable=({data})=>
  {
    const colums 
     return (
         <table>
             <thead>
              <th>ID</th>  
              <th>Image</th>  
              <th>Name</th>  
             </thead>
             <tbody>
                {data.map(row =>
                 <tr>
                {
                    columns.map(column => <td></td>)
                }
                </tr>)}
             </tbody>
         </table>
        );
    }
    export default App;

    <FlatList
    data={this.state.dataSource}
    renderItem ={   
      ({item}) => ( 

      <DataTable.Row>
        <DataTable.Cell>{item.id}</DataTable.Cell>
        <DataTable.Cell>
          <Image 
           style={{width: 80, height: 80, borderWidth: 1,borderRadius: 60 }}
           source={{uri: `data:image/jpeg;base64,${item.image_medium}`}}
           />
        </DataTable.Cell>
        <DataTable.Cell>{item.display_name}</DataTable.Cell>
        <DataTable.Cell>
        <Button
              //buttonStyle={styles.loginButton}
              onPress={() => this.props.navigation.navigate( 'Detail', {
                password: "password",
                uid:2,
                eid: item.id
              } )}
              style={{marginLeft: 40}}
              title="More"
            />

        </DataTable.Cell>

      </DataTable.Row>
    
    )}
    keyExtractor={({ id }, index) => id}
    />


    <DataTable.Pagination
      page={1}
      numberOfPages={3}
      onPageChange={(page) => { console.log(page); }}
      label="1-2 of 6"
    />
  </DataTable>*/