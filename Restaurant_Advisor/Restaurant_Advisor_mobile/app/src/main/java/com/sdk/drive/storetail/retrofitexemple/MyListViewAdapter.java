package com.sdk.drive.storetail.retrofitexemple;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.restaurant_advisor.R;

import java.util.List;

public class MyListViewAdapter extends BaseAdapter {

    private Context context;
    private List restaurantsList;

    public MyListViewAdapter(Context context, List restaurantsList) {
        this.context = context;
        this.restaurantsList = restaurantsList;
    }

    @Override
    public int getCount() { return restaurantsList.size(); }

    @Override
    public Object getItem(int position) { return restaurantsList.size(); }

    @Override
    public long getItemId(int position) { return position; }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.restaurant_row, null);
        }

        Restaurants restaurant = (Restaurants) restaurantsList.get(position);

        TextView textViewRestaurantName = (TextView) convertView.findViewById(R.id.restaurant_name);
        TextView textViewRestaurantId = (TextView) convertView.findViewById(R.id.restaurant_id);
        TextView textViewRestaurantUpdate = (TextView) convertView.findViewById(R.id.buttonUpdate);
        TextView textViewRestaurantDelete = (TextView) convertView.findViewById(R.id.buttonDelete);

        textViewRestaurantName.setText(restaurant.getName());
        textViewRestaurantId.setText(restaurant.getId());

        return convertView;
    }
}
