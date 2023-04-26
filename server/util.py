import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None
__kouzou = None


def get_estimated_price(location, sqft, using, kouzou):
    try:
        loc_index = __data_columns.index(location.lower())
        size_index = __data_columns.index(kouzou.lower())
    except:
        loc_index = -1
        size_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = using
    if loc_index >= 0:
        x[loc_index] = 1
    if size_index >= 0:
        x[size_index] = 1

    return round(__model.predict([x])[0], 2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __locations
    global __kouzou

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[2:32]  # first 3 columns are sqft, bath, bhk
        __kouzou = __data_columns[33:]

    global __model
    if __model is None:
        with open('./artifacts/kantou_home_prices_model.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")


def get_location_names():
    return __locations


def get_kouzou_names():
    return __kouzou


def get_data_columns():
    return __data_columns


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_kouzou_names())
    print(get_estimated_price('Shinjuku', 130.0, 0, 'w'))
    # print(get_estimated_price('Shinagawa', 75, 0, 'w'))
    # print(get_estimated_price('Adachi', 100, 0, 'w'))
